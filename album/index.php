<?php
define( 'ALBUM_TITLE', '' );

// default configuration:
// - originals ends with .JPG
// - thumbnails ends with .jpg
define( 'THUMBNAIL_GLOB_PATTERN', '*.jpg' );
define( 'THUMBNAIL_TO_ORIGINAL_SEARCH', '.jpg' );
define( 'THUMBNAIL_TO_ORIGINAL_REPLACE', '.JPG' );
?>
<!DOCTYPE html>
<html lang="fr-FR">
<head>
    <meta charset="utf-8" />
    <title><?php echo ALBUM_TITLE ?></title>
    <style>
    ul li
    {
        display:inline;
        list-style-type:none;
    }
    ul
    {
        list-style-type:none;
    }
    img
    {
        border:1px solid #000;
    }
    </style>
</head>
<body>
    <h1><?php echo ALBUM_TITLE ?></h1>
    <ul>
    <?php
    $files = glob( THUMBNAIL_GLOB_PATTERN );
    $bigs = array();
    foreach ( $files as $file )
    {
        $big = str_replace(
            THUMBNAIL_TO_ORIGINAL_SEARCH,
            THUMBNAIL_TO_ORIGINAL_REPLACE,
            $file
        );
        echo "      <li><a href=\"{$big}\" target=\"_blank\"><img src=\"{$file}\" alt=\"\" /></a></li>\n";
    }
    ?>
    </ul>
</body>
</html>
