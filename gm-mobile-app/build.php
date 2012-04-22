<?php

define( 'WWW_ROOT', 'www/' );
define( 'PUBLIC_CACHE_DIR', 'cache/' );
define( 'INDEX_TEMPLATE', 'templates/index.phtml' );
define( 'INDEX_FILE', WWW_ROOT . 'index.htm' );
define( 'INI_SETTINGS', 'settings/app.ini' );

$vars = array(
    'settings' => parse_ini_file( INI_SETTINGS, true )
);

$content = template( INDEX_TEMPLATE, $vars );


if ( $content !== null )
{
    file_put_contents( INDEX_FILE, $content );
}

function error( $msg, $context )
{
    fputs( STDERR, '[' . $context . '] ' . $msg . "\n" );
}

function template( $tplFile, array $vars )
{
    if ( !file_exists( $tplFile ) )
    {
        die( $tplFile . ' does not exist' );
    }

    function gm_css( $cssFiles, $packer )
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
            // TODO minify
            file_put_contents( WWW_ROOT . PUBLIC_CACHE_DIR . $css, $content );
            $res = '<link rel="stylesheet" href="' .
                        PUBLIC_CACHE_DIR . $css . '?' . $mtime . '" />' . "\n";
        }
        return $res;
    }

    extract( $vars );

    ob_start();
    include $tplFile;
    $_content = ob_get_contents();;
    ob_clean();

    return $_content;
}

