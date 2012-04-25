<?php


function gm_css( $cssFiles, $packer = false, $minify = false )
{
    $res = '';
    $content = '';
    $mtime = 0;
    foreach ( $cssFiles as $css )
    {
        $prefixcss = WWW_ROOT . $css;
        if ( !file_exists( $prefixcss ) )
        {
            error( "$css does not exist", __FUNCTION__ );
            continue;
        }
        if ( !$packer )
        {
            $res .= '<link rel="stylesheet" href="' . $css .'" />' . "\n";
        }
        else
        {
            $mtime = max( $mtime, filemtime( $prefixcss ) );
            $content .= file_get_contents( $prefixcss ) . "\n";
        }
    }
    if ( $packer )
    {
        $css = 'pack.css';
        if ( $minify )
        {
            include 'lib/ext/cssmin.php';
            $min = new CSSmin();
            $content = $min->run( $content );
        }
        file_put_contents( WWW_ROOT . PUBLIC_CACHE_DIR . $css, $content );
        $res = '<link rel="stylesheet" href="' .
                    PUBLIC_CACHE_DIR . $css . '?' . $mtime . '" />' . "\n";
    }
    return $res;
}

