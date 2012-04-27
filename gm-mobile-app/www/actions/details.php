<?php
define( 'PATH_PREFIX', '../../' );
require PATH_PREFIX . 'lib/utils.php';

if ( !isset( $_GET['num'] ) || trim( $_GET['num'] ) === '' )
{
    error500JSON(
        array( 'error' => '\'num\' parameter is missing' )
    );
}
if ( !isset( $_GET['date'] ) || trim( $_GET['date'] ) === '' )
{
    error500JSON(
        array( 'error' => '\'date\' parameter is missing' )
    );
}

$num = (int) $_GET['num'];
$type = ( isset( $_GET['type'] ) && $_GET['type'] != "0" ) ? $_GET['type'] : '';
$date = $_GET['date'];
$raw = false;

if ( isset( $_GET['raw'] ) )
{
    $raw = true;
}

header('Content-Type: application/json; charset=utf-8');

$ini = include PATH_PREFIX . 'config.php';

$output = http_post(
    'http://' . $ini['details']['host'] . $ini['details']['path'],
    sprintf( $ini['details']['post'], $num, $date ),
    array(
        'Accept-Encoding: gzip',
        'Accept-Charset: utf-8, iso-8859-1, utf-16, *;q=0.7',
    )
);

// $output = file_get_contents( '../../trajet.json' );

$struct = json_decode( mb_convert_encoding( $output, 'UTF-8' ), true );

if ( $raw )
{
    debug_json( $output, $struct );
    die();
}

if ( !is_array( $struct ) )
{
    error500JSON(
        array( 'error' => 'No stop information' )
    );
}

$train = null;
if ( count( $struct ) > 1 && $type != '' )
{
    foreach ( $struct as $s )
    {
        if ( stripos( normalizeType( $s['mode'] ), $type ) !== false )
        {
            $train = $s;
            break;
        }
    }
}
else
{
    $train = $struct[0];
}

if ( $train === null )
{
    error500JSON(
        array( 'error' => 'Unable to find the train' )
    );
}

$result = array();

$tz = new DateTimeZone( $ini['app']['timezone'] );
$start = parseDate( $train['dateDepart'], $tz );
$end  = parseDate( $train['dateArrivee'], $tz );


$result['num'] = $train['numero'];
$result['type'] = normalizeType( $train['mode'] );
$result['startDate'] = $start['date'];
$result['startTime'] = $start['time'];
$result['destinationDate'] = $end['date'];
$result['destinationTime'] = $end['time'];
$result['duration'] = calcDuration( $train['dateDepart'], $train['dateArrivee'] );
$result['destination'] = normalizeStation( $train['stationArrivee'] );
$result['start'] = normalizeStation( $train['stationDepart'] );

$result['stops'] = array();

foreach ( $train['arrets'] as $stop )
{
    $s = array();
    $s['id'] = $stop['idx'];
    $s['name'] = normalizeStation( $stop['nom'] );
    if ( isset( $stop['arrivee'] ) )
    {
        $stopDate = parseDate( $stop['arrivee'], $tz );
        $s['stopDate'] = $stopDate['date'];
        $s['stopTime'] = $stopDate['time'];
    }
    if ( isset( $stop['depart'] ) )
    {
        $start = parseDate( $stop['depart'], $tz );
        $s['startDate'] = $start['date'];
        $s['startTime'] = $start['time'];
    }
    // TODO add lat / long if needed

    if ( isset( $stop['impactArrivee'] ) )
    {
        $s['lateTime'] = $stop['impactArrivee']['tempsRetard'];
        if ( !isset( $stop['depart'] ) )
        {
            // last stop => destination
            $result['lateTime'] = $stop['impactArrivee']['tempsRetard'];
            $result['details'] = isset( $stop['impactArrivee']['text'] ) ? $stop['impactArrivee']['text'] : '';
        }
    }
    $result['stops'][] = $s;
}


echo json_encode( $result );
