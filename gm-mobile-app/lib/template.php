<?php

function template( $tplFile, array $vars )
{
    if ( !file_exists( $tplFile ) )
    {
        die( $tplFile . ' does not exist' );
    }

    include_once 'lib/template_operators.php';

    extract( $vars );

    ob_start();
    include $tplFile;
    $_content = ob_get_contents();;
    ob_clean();

    return $_content;
}


