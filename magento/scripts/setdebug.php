#! /usr/bin/env php
<?php
//
// Copyright (C) 2009 Damien Pobel <dpobel@free.fr>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//


require 'app/Mage.php';
if (!Mage::isInstalled()) {
    echo "Application is not installed yet, please complete install wizard first.";
    exit;
}
Mage::app();

define('WRONG_OPTION_CODE', 1);
define('EXCEPTION_CODE', 2);

$_SERVER['SCRIPT_NAME'] = str_replace(basename(__FILE__), 'index.php', $_SERVER['SCRIPT_NAME']);
$_SERVER['SCRIPT_FILENAME'] = str_replace(basename(__FILE__), 'index.php', $_SERVER['SCRIPT_FILENAME']);

$templateHints = null;
$templateHintsBlock = null;
$profiler = null;
$codeWebsite = '';

$webSites = Mage::app()->getWebsites(true, true);
$existingWebSiteCodes = implode(', ', array_keys($webSites));

$optionsArray = array('help|h'      => 'Display this message',
                      'site|s=s'    => 'Code of the site where option should be changed, should be one of the following : ' . $existingWebSiteCodes,
                      'hints|i'     => 'Enables "Template path hints" option',
                      'block|b'     => 'Enables "Add Block Names to Hints" option (implies -i option)',
                      'profiler|p'  => 'Enables "Profiler" option',
                      'disable|d'   => 'Disable "Template path hints", "Add Block Name to Hints" and "Profiler" options');

try {
    $opts = new Zend_Console_Getopt($optionsArray);
    $opts->parse();
} catch(Exception $e) {
    echo "Exception " . $e->getMessage() . PHP_EOL;
    exit(EXCEPTION_CODE);
}

if (isset($opts->h)) {
    echo $opts->getUsageMessage();
    exit();
}

if (isset($opts->s)) {
    $codeWebsite = $opts->s;
} else {
    echo $opts->getUsageMessage();
    exit(WRONG_OPTION_CODE);
}

if (isset($opts->d)) {
    $templateHints = 0;
    $templateHintsBlock = 0;
    $profiler = 0;
} elseif (isset($opts->b)) {
    $templateHints = 1;
    $templateHintsBlock = 1;
}

if (isset($opts->i)) {
    $templateHints = 1;
}

if (isset($opts->p)) {
    $profiler = 1;
}

try {
    $website = Mage::getModel('core/website');
    $website->load($codeWebsite);
    if ($website->getId() === null) {
        echo "Error : \"" . $codeWebsite . "\" website does not exist" . PHP_EOL;
        echo $opts->getUsageMessage();
        exit(WRONG_OPTION_CODE);
    }
    $config = Mage::getConfig();
    if ($templateHints !== null) {
        $config->saveConfig('dev/debug/template_hints', $templateHints, 'websites', $website->getId());
    }
    if ($templateHintsBlock !== null) {
        $config->saveConfig('dev/debug/template_hints_blocks', $templateHintsBlock, 'websites', $website->getId());
    }
    if ($profiler !== null) {
        $config->saveConfig('dev/debug/profiler', $profiler, 'websites', $website->getId());
    }
} catch (Exception $e) {
    echo "Exception " . $e->getMessage();
    exit(EXCEPTION_CODE);
}

