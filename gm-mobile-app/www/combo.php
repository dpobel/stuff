<?php
define( 'COMBO_YUI_BASE', 'js/' );
define( 'COMBO_DEBUG', true );
define( 'COMBO_APC_CACHE', function_exists( 'apc_fetch' ) );
define( 'COMBO_APC_TTL', 0 );

if ( !isset( $_SERVER['QUERY_STRING'] ) )
{
    die( 'nothing to do' );
}

function headerDebug( $hdr )
{
    if ( COMBO_DEBUG === true )
    {
        header( $hdr );
    }
}

$yuiFiles = explode( '&', $_SERVER['QUERY_STRING'] );
$cacheKey = md5( $_SERVER['QUERY_STRING'] . COMBO_YUI_BASE );

header( "Cache-Control: max-age=315360000" );
header(
    "Expires: " . date( "D, j M Y H:i:s", strtotime( "now + 10 years" ) ) . " GMT"
);

header( 'Content-Type: application/x-javascript' );

if ( COMBO_APC_CACHE )
{
    $cache = apc_fetch( $cacheKey );
    if ( $cache !== false )
    {
        headerDebug( "X-Combo-Debug: fetched from cache; key=$cacheKey" );
        echo $cache;
        die();
    }
    else
    {
        headerDebug( "X-Combo-Debug: empty cache; key=$cacheKey" );
    }
}

$code = '';
$error = false;
foreach ( $yuiFiles as $f )
{
    $file = COMBO_YUI_BASE . str_replace(
        '\\', '/', str_replace( '../', '', $f )
    );
    if ( file_exists( $file ) )
    {
        $code .= file_get_contents( $file );
    }
    else if ( COMBO_DEBUG === true )
    {
        $error = true;
        $code .= "/* ERROR: {$file} does not exist */";
    }
}
if ( $error !== true && COMBO_APC_CACHE )
{
    headerDebug( "X-Combo-Debug: stored in cache; key=$cacheKey" );
    apc_store( $cacheKey, $code, COMBO_APC_TTL );
}
echo $code;
