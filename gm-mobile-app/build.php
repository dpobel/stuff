<?php
require 'lib/template.php';
require 'lib/utils.php';

$ini = include 'config.php';

define( 'WWW_ROOT', $ini['app']['root'] );
define( 'PUBLIC_CACHE_DIR', $ini['app']['public_cache_dir'] );

$vars = array( 'settings' => $ini );
$content = template( $ini['app']['index_template'], $vars );

if ( $content !== null )
{
    file_put_contents(
        WWW_ROOT . $ini['app']['index_file'], $content
    );
}


