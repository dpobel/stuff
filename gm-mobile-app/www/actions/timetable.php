<?php
define( 'PATH_PREFIX', '../../' );

$result = array( 'error' => null, 'data' => null );
if ( !isset( $_GET['code'] ) || trim( $_GET['code'] ) === '' )
{
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: application/json; charset=utf-8');
    $result['error'] = '\'code\' parameter is missing';
    die( json_encode( $result ) );
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
    header('HTTP/1.1 500 Internal Server Error');
    $result['error'] = 'Station not found';
    die( json_encode( $result ) );
}


$name = $stations[$code]['name'];

$ch = curl_init();
curl_setopt(
    $ch, CURLOPT_URL,
    'http://' . $ini['timetable']['host'] . $ini['timetable']['path']
);
curl_setopt(
    $ch, CURLOPT_HTTPHEADER,
    array(
        'Accept-Encoding: gzip',
        'Accept-Charset: utf-8, iso-8859-1, utf-16, *;q=0.7',
    )
);

curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch, CURLOPT_HEADER, false );
curl_setopt( $ch, CURLOPT_POST, true );
curl_setopt(
    $ch, CURLOPT_POSTFIELDS,
    sprintf( $ini['timetable']['post'], $name )
);

$output = curl_exec( $ch );


$struct = json_decode( mb_convert_encoding( $output, 'UTF-8' ), true );

if ( $raw )
{
    echo "\nOutput:\n" . $output . "\n";
    echo "\nStruct JSON\n";
    var_export( $struct );
    echo "\nLast error code\n";
    switch( json_last_error() )
    {
        case JSON_ERROR_NONE:
            echo ' - Aucune erreur';
        break;
        case JSON_ERROR_DEPTH:
            echo ' - Profondeur maximale atteinte';
        break;
        case JSON_ERROR_STATE_MISMATCH:
            echo ' - Inadéquation des modes ou underflow';
        break;
        case JSON_ERROR_CTRL_CHAR:
            echo ' - Erreur lors du contrôle des caractères';
        break;
        case JSON_ERROR_SYNTAX:
            echo ' - Erreur de syntaxe ; JSON malformé';
        break;
        case JSON_ERROR_UTF8:
            echo ' - Caractères UTF-8 malformés, probablement une erreur d\'encodage';
        break;
        default:
            echo ' - Erreur inconnue';
        break;
    }
    die();
}

if ( !isset( $struct['listeHoraire'] ) || count( $struct['listeHoraire'] ) === 0 )
{
    header('HTTP/1.1 500 Internal Server Error');
    $result['error'] = 'Aucun horaire n\'a été trouvé pour cette gare';
    die( json_encode( $result ) );
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

    $dt = new DateTime( $train['depart'] );
    $dt->add( DateInterval::createFromDateString( $tz->getOffset( $dt ) . ' seconds' ) );

    $t = array(
        'num' => $train['numero'],
        'type' => str_replace( 'Train ', '', $train['mode']['libelle'] ),
        'destination' => str_replace( 'gare de ', '', $train['destination']['nom'] ),
        'time' => $dt->format( 'H:i' ),
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

echo json_encode( $result );

