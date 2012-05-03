<?php

function gm_css_code( $content, $minify = false, $inlineImage = false )
{
    if ( $inlineImage
        && preg_match_all(
            "/url\(\s*[\'|\"]?([A-Za-z0-9_\-\/\.\\%?&#]+)[\'|\"]?\s*\)/ix", $content, $urls
        ) )
    {
        $urls = array_unique( $urls[1] );
        foreach ( $urls as $url )
        {
            if ( preg_match("/\.(gif|png|jpe?g)$/i", $url, $type ) )
            {
                $type[1] == 'jpg' ? $type = 'jpeg' : $type = $type[1];
                if ( $url[0] == '/' )
                {
                    $path = 'www' . $url;
                }
                else
                {
                    $path = 'www/css/' . $url;
                }
                if ( file_exists( $path ) )
                {
                    $data = 'data:image/' . $type . ';base64,'
                            . base64_encode( file_get_contents( $path ) );
                    $content = str_replace( $url, $data, $content );
                }
                else
                {
                    error( "CSS Stylesheet image '$url' does not exist", __FUNCTION__ );
                }
            }

        }
    }

    if ( $minify )
    {
        include_once 'lib/ext/cssmin.php';
        $min = new CSSmin();
        $content = $min->run( $content );
    }
    return $content;
}


function gm_css( $cssFiles, $packer = false, $minify = false, $inlineImage = false )
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
        $content = gm_css_code( $content, $minify, $inlineImage );
        file_put_contents( WWW_ROOT . PUBLIC_CACHE_DIR . $css, $content );
        $res = '<link rel="stylesheet" href="' .
                    PUBLIC_CACHE_DIR . $css . '?' . $mtime . '" />' . "\n";
    }
    return $res;
}


function gm_js_file( $jsFile, $dir = 'js/', $minify = false, $command = '' )
{
    if ( !$minify )
    {
        return $jsFile;
    }
    if ( !$command )
    {
        error( "No command to minify JavaScript", __FUNCTION__ );
        return $jsFile;
    }
    $destFile = preg_replace( '/.js$/', '-min.js', $jsFile );
    $content = shell_exec( $command . ' ' . WWW_ROOT . $dir . $jsFile );
    file_put_contents( WWW_ROOT . $dir . $destFile, $content );
    return $destFile;
}


function handlebars_tpl( $id, $path )
{
    $code = '<script id="t-' . $id . '" type="text/x-handlebars-template">';
    $code .= file_get_contents( $path . '/' . $id . '.js' );
    $code .= '</script>';
    return $code;
}

function handlebars_partial( $name, $path )
{
    $code = '<script data-name="' . $name . '" type="text/x-handlebars-template" class="gm-t-partial">';
    $code .= file_get_contents( $path . '/' . $name . '.js' );
    $code .= '</script>';
    return $code;
}
