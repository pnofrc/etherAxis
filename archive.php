<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <!--<![endif]-->
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- <link rel="stylesheet" href=".style.css"> -->
        <script src="./script/cookie.js"></script>
        
    </head>
    <body>
        <div class="fs">
    <?php

$fs = preg_grep('/^([^.])/', scandir('./ether_archive')); 
foreach ($fs as $fileCurr) {
    $filePath = $fileCurr;
    $date = date("F d Y", fileatime($fileCurr));
    echo "<div class='lista'><span><a href='./ether_archive/$filePath' title='$filecurr'>$fileCurr</a></span><span>$date</span><hr></div>";
}  
?>
</div>

<button onclick="next()">Forward</button>
<script src="./app.js"></script>

 
    <script>

        function next() {
            Cookies.set(2,'quest');
            routing();
        }
    </script>
       </body>
</html>