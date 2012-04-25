#! /bin/sh


FILES=`find www/js/350 -name \*min.js`

for F in $FILES ; do
    ORIG=`echo $F | sed 's/\-min.js/\-min\-orig.js/g'`
    echo "$F ($ORIG)"
    cp $F $ORIG
    java -jar bin/compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --summary_detail_level 0 --js $ORIG > $F
done
