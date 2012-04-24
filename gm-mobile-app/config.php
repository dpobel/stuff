<?php

define( 'INI_SETTINGS', 'settings/app.ini' );

$_ini = parse_ini_file( INI_SETTINGS, true );

ini_set( 'date.timzeone', $_ini['app']['timezone'] );

return $_ini;
