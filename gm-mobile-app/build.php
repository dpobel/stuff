<?php
require 'lib/template.php';
require 'lib/utils.php';

$ini = include 'config.php';

define( 'WWW_ROOT', $ini['app']['root'] );
define( 'PUBLIC_CACHE_DIR', $ini['app']['public_cache_dir'] );

$vars = array( 'settings' => $ini );

echo "Generating {$ini['app']['index_template']}\n";
$content = template( $ini['app']['index_template'], $vars );
if ( $content !== null )
{
    file_put_contents(
        WWW_ROOT . $ini['app']['index_file'], $content
    );
}

echo "Building the station list\n";
$lines = file( $ini['app']['data_file'] );
array_shift( $lines );
$result = array();
foreach ( $lines as $l )
{
    list( $name, $x, $y, $lat, $lon ) = explode( ';', trim( $l ) );
    $result[] = array(
        'name' => trim( $name, '"' ),
        'lat' => (float) str_replace( ',', '.', $lat ),
        'lon' => (float) str_replace( ',', '.', $lon )
    );
}
file_put_contents( $ini['app']['json_data_file'], json_encode( $result ) );


