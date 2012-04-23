<?php
define( 'PATH_PREFIX', '../../' );

header('Content-Type: application/json; charset=utf-8');

$result = array( 'error' => null, 'data' => null );
if ( !isset( $_GET['str'] ) )
{
    $result['error'] = 'str parameter is missing';
    die( json_encode( $result ) );
}

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
        $matched[] = $station;
    }
}
echo json_encode( $matched );
