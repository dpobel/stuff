<?php
define( 'PATH_PREFIX', '../../' );


$result = array( 'error' => null, 'data' => null );
if ( !isset( $_GET['str'] ) || trim( $_GET['str'] ) === '' )
{
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: application/json; charset=utf-8');
    $result['error'] = 'str parameter is missing';
    die( json_encode( $result ) );
}

header('Content-Type: application/json; charset=utf-8');

$ini = include PATH_PREFIX . 'config.php';

// TODO ? use a SQLite database instead of this poor linear search
$stations = json_decode(
    file_get_contents( PATH_PREFIX . $ini['app']['json_data_file'] )
);

$matched = array();
foreach ( $stations as $station )
{
    if ( stripos( $station->name, $_GET['str'] ) !== false )
    {
        $matched[] = array( 'name' => $station->name );
    }
}
echo json_encode( $matched );
