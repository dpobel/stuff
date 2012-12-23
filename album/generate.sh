#! /bin/sh

ORIGINAL=`find . -name \*.JPG`
RESIZE="8%"

for f in `find . -name \*.JPG` ; do
    N=`echo $f | sed s/JPG/jpg/g`
    echo "Auto fixing the orientation"
    mogrify -auto-orient $f
    echo "$f => $N"
    convert -resize $RESIZE $f $N
done


