YUI.add("uploader",function(a){var b=a.config.win;b&&b.File&&b.FormData&&b.XMLHttpRequest?a.Uploader=a.UploaderHTML5:a.SWFDetect.isFlashVersionAtLeast(10,0,45)?a.Uploader=a.UploaderFlash:(a.namespace("Uploader"),a.Uploader.TYPE="none")},"3.5.0",{requires:["uploader-flash","uploader-html5"]});
