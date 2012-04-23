<?php

function error( $msg, $context )
{
    fputs( STDERR, '[' . $context . '] ' . $msg . "\n" );
}


