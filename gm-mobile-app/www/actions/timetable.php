<?php
define( 'PATH_PREFIX', '../../' );
require PATH_PREFIX . 'lib/utils.php';

if ( !isset( $_GET['code'] ) || trim( $_GET['code'] ) === '' )
{
    error500JSON(
        array( 'error' => '\'code\' parameter is missing' )
    );
}
$code = $_GET['code'];
$raw = false;

if ( isset( $_GET['raw'] ) )
{
    $raw = true;
}

header('Content-Type: application/json; charset=utf-8');

$ini = include PATH_PREFIX . 'config.php';

$stations = json_decode(
    file_get_contents( PATH_PREFIX . $ini['app']['json_data_file'] ),
    true
);

if ( !isset( $stations[$code] ) )
{
    error500JSON(
        array( 'error' => 'Station not found' )
    );
}


$name = $stations[$code]['name'];

$output = http_post(
    'http://' . $ini['timetable']['host'] . $ini['timetable']['path'],
    sprintf( $ini['timetable']['post'], $name ),
    array(
        'Accept-Encoding: gzip',
        'Accept-Charset: utf-8, iso-8859-1, utf-16, *;q=0.7',
    )
);

$struct = json_decode( mb_convert_encoding( $output, 'UTF-8' ), true );

if ( $raw )
{
    debug_json( $output, $struct );
    die();
}

if ( !isset( $struct['listeHoraire'] ) || count( $struct['listeHoraire'] ) === 0 )
{
    error500JSON(
        array( 'error' => 'Aucun horaire n\'a été trouvé pour cette gare' )
    );
}

$result = array( 'trains' => array() );

$tz = new DateTimeZone( $ini['app']['timezone'] );
$trainsIndex = array(); // results may contain the same train twice...
foreach ( $struct['listeHoraire'] as $train )
{
    if ( isset( $trainsIndex[$train['numero']] ) )
    {
        continue;
    }
    $trainsIndex[$train['numero']] = true;
    
    $date = parseDate( $train['depart'], $tz );

    $t = array(
        'num' => $train['numero'],
        'type' => normalizeType( $train['mode']['libelle'] ),
        'destination' => normalizeStation( $train['destination']['nom'] ),
        'startTime' => $date['time'],
        'startDate' => $date['date'],
        'platform' => $train['voie'],
        'details' => ''
    );
    if ( isset( $train['impactDepart']['typeEvenement']['value'] ) && $train['impactDepart']['typeEvenement']['value'] === 'RETARD_OBSERVE' )
    {
        $t['details'] = 'Retard de ' . $train['impactDepart']['tempsRetard'] . ' min.';
    }
    $result['trains'][] = $t;
}
$result['time'] = date( 'H:i' );
$result['station'] = $stations[$code];

echo json_encode( $result );

