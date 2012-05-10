<?php

function error( $msg, $context )
{
    fputs( STDERR, '[' . $context . '] ' . $msg . "\n" );
}


function error500JSON( $data )
{
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: application/json; charset=utf-8');
    die( json_encode( $data ) );
}

function http_post( $url, $postData, $headers )
{
    $ch = curl_init();
    curl_setopt( $ch, CURLOPT_URL, $url );
    curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers);

    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
    curl_setopt( $ch, CURLOPT_HEADER, false );
    curl_setopt( $ch, CURLOPT_POST, true );
    curl_setopt( $ch, CURLOPT_POSTFIELDS, $postData );

    return curl_exec( $ch );
}

function debug_json( $output, $struct )
{
    echo "\nOutput:\n" . $output . "\n";
    echo "\nStruct JSON\n";
    var_export( $struct );
    echo "\nLast error code\n";
    echo json_last_error_text();
}



function json_last_error_text()
{
    switch( json_last_error() )
    {
        case JSON_ERROR_NONE:
            return ' - Aucune erreur';
        break;
        case JSON_ERROR_DEPTH:
            return ' - Profondeur maximale atteinte';
        break;
        case JSON_ERROR_STATE_MISMATCH:
            return ' - Inadéquation des modes ou underflow';
        break;
        case JSON_ERROR_CTRL_CHAR:
            return ' - Erreur lors du contrôle des caractères';
        break;
        case JSON_ERROR_SYNTAX:
            return ' - Erreur de syntaxe ; JSON malformé';
        break;
        case JSON_ERROR_UTF8:
            return ' - Caractères UTF-8 malformés, probablement une erreur d\'encodage';
        break;
        default:
            return ' - Erreur inconnue';
        break;
    }
}

function normalizeType( $type )
{
    return str_replace( 'Train ', '', $type );
}


function normalizeStation( $station )
{
    return str_replace( 'gare de ', '', $station );
}


function parseDate( $dateStr, DateTimeZone $tz )
{
    $dt = new DateTime( $dateStr );
    $dt->add( DateInterval::createFromDateString( $tz->getOffset( $dt ) . ' seconds' ) );
    return array(
        'time' => $dt->format( 'H:i' ),
        'date' => $dt->format( 'd/m/Y' )
    );
}


function calcDuration( $begin, $end )
{
    $int = date_diff( new DateTime( $end ), new DateTime( $begin ), true );
    $min = $int->format( '%I' );
    $h = $int->format( '%H' );
    if ( $h )
        return $h . 'h' . $min;
    else
        return $min . 'min.';
}
