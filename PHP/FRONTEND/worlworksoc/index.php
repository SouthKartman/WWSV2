<?php include("include/config.php");

if (isset($_GET['exit'])){
    unset($_SESSION['user']);
 } 


if (!isset($_SESSION['user'])){
    header('Location: /worlworksoc/auth.php');
    die;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WWS</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="styles/message.css">
    <link rel="stylesheet" href="styles/header.css">
    <link rel="stylesheet" href="styles/home.css">
    <link rel="stylesheet" href="styles/start.css">
    <link rel="stylesheet" href="styles/popup.style.css">
    <link rel="stylesheet" href="styles/Write_Profile.css">

    
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"></script>
    <script src="libs/gsap/gsap.min.js" defer></script>
	<script src="libs/gsap/ScrollTrigger.min.js" defer></script>
	<script src="libs/gsap/ScrollSmoother.min.js" defer></script>
    <script src="js/popup.function.js"></script>
    <script>const typeAnimate = 'fade';</script>
    
    <!-- <script src="js/app.js" defer></script> -->
</head>

<body>


<?php

$info = "";
if(isset($_GET['id'])){
    $user= mysqli_fetch_assoc(mysqli_query($connections, "SELECT * FROM `users` WHERE `id`=".intval($_GET['id'])));
    $info = json_decode($user['info_json']);
}else{
    $q = mysqli_query($connections, "SELECT * FROM `users` WHERE `id`=".intval($_SESSION['user']['id']));
    if (mysqli_num_rows($q) == 0){
        echo("<script>document.location.href  = 'worlworksoc/auth.php'</script>");
         die;
    }
    $user = mysqli_fetch_assoc(mysqli_query($connections, "SELECT * FROM `users` WHERE `id`=".intval($_SESSION['user']['id'])));

    $info = json_decode($user['info_json']);
}
?>



    <div class="m-container">
        <!-- <div class="left-menu">
            <div>
                <div style="margin-top:5vw" title="Дом"><a  href="?home="><img src="webicons\home.svg" alt=""></a>   </div>
                <div title="Новости"><a href="?news="><img src="webicons\news.svg" alt=""></a>   </div>
                <div title="Сообщения"><a href="?messages="><img src="webicons\message.svg" alt=""></a></div>
                <div title="Уведомления"><a  href="?pushs="><img id="pushb" src="webicons\pushs.svg" alt=""></a></div>
                <div title="Друзья"><a href="?friends="><img src="webicons\friends.svg" alt=""></a></div>
                <div><a href=""><img src="icons\group.svg" alt=""></a>  </div>
                <div title="Выйти"><a href="/worlworksoc/?exit="><img src="webicons\turn-off.svg" alt=""></a>  </div>
            </div>
        </div> -->
        <div class="header">
    <div class="header-left">
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 12h18M3 6h18M3 18h18" /></svg>
     <div class="logo">Smart_Social</div>
     <div class="search-bar">
      <input type="text" placeholder="Search..." />
     </div>
    </div>
    <div class="header-menu">
     <!-- <div class="menu-item">Home</div>
     <div class="menu-item">Categories</div>
     <div class="menu-item notify">Subscriptions</div> -->
    <div class="menu-item" title="Дом"><a  href="?home="> <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"
    style="WIDTH: 23PX;
    COLOR: WHITE;">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <path d="M9 22V12h6v10" />
            </svg></a>   </div>
    <div class="menu-item" title="Новости"><a href="?news="><svg stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"
    style="WIDTH: 23PX;
    COLOR: WHITE;">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg></a>   </div>
    <div class="menu-item" title="Сообщения"><a href="?messages="><svg width="27px"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="3" y="5" width="18" height="14" rx="2" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg></a></div>
    <div class="menu-item" title="Друзья"><a href="?friends="><svg xmlns="http://www.w3.org/2000/svg" width="29px" viewBox="0 0 24 24" fill="none">
<path d="M4 20V19C4 16.2386 6.23858 14 9 14H12.75M17.5355 13.9645V17.5M17.5355 17.5V21.0355M17.5355 17.5H21.0711M17.5355 17.5H14M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></a></div>
    <!-- <div class="menu-item"><a href=""><img src="icons\group.svg" alt=""></a>  </div> -->
    <div class="menu-item" title="Выйти"><a href="/worlworksoc/?exit="><svg 
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   version="1.1"
   width="22px"
   viewBox="0 0 10 10"
   id="svg2">
  <metadata
     id="metadata8">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <defs
     id="defs6" />
  <rect
     width="10"
     height="10"
     x="0"
     y="0"
     id="canvas"
     style="fill:none;stroke:none;visibility:hidden" />
  <path
     d="m 0,0 0,10 6.25,0 0,-2.5 -1.25,0 0,1.25 -3.75,0 0,-7.5 3.75,0 0,1.25 1.25,0 L 6.25,0 0,0 z m 7,2.5 0,1.75 -4,0 0,1.5 4,0 L 7,7.5 10,5 7,2.5 z"
     id="exit"
     style="fill:#fff;fill-opacity:1;stroke:none" />
</svg></a>  </div>
    </div>
    <div class="user-settings">
     <!-- <button class="button">
      <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 512.06 512.06">
       <path d="M426.63 188.22C402.97 93.95 307.37 36.7 213.08 60.37A176 176 0 0080.39 218.3a96 96 0 0016 190.72h80v-32h-80a64 64 0 010-128 16 16 0 0016-16c-.08-79.53 64.33-144.06 143.86-144.14a144 144 0 01141.42 116.14 16 16 0 0013.6 12.8 80 80 0 01-10.88 159.2h-64v32h64c61.86-.18 111.85-50.48 111.66-112.34a112 112 0 00-85.41-108.46z" />
       <path d="M245.03 253.66l-64 64 22.56 22.56 36.8-36.64v153.44h32V303.58l36.64 36.64 22.56-22.56-64-64a16 16 0 00-22.55 0z" /></svg>
      Upload
     </button> -->
     <div id="pushb" title="Уведомления"><a  href="?pushs=">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></svg>
    </a></div>

    
    <?php if (isset($_GET['exit'])){
       unset($_SESSION['user']);
    } 
    $check =  mysqli_query($connections, "SELECT * FROM `pushes` WHERE (`userid`={$_SESSION['user']['id']})");
    if (mysqli_num_rows($check) != 0){
        ?>
        <style>
        .user-settings svg{
            color: #ff0000;
        }
        </style>
        <?php
    }
    
    ?>
     
      <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 492 492">
      <path d="M484.13 124.99l-16.11-16.23a26.72 26.72 0 00-19.04-7.86c-7.2 0-13.96 2.79-19.03 7.86L246.1 292.6 62.06 108.55c-5.07-5.06-11.82-7.85-19.03-7.85s-13.97 2.79-19.04 7.85L7.87 124.68a26.94 26.94 0 000 38.06l219.14 219.93c5.06 5.06 11.81 8.63 19.08 8.63h.09c7.2 0 13.96-3.57 19.02-8.63l218.93-219.33A27.18 27.18 0 00492 144.1c0-7.2-2.8-14.06-7.87-19.12z" /></svg> -->
      <div style="color:#fff;"><?php echo($user['name']);?></div>
      <div class="img" style="background-image: url(<?php echo($info->avatar) ?>);background-repeat: no-repeat;background-size: cover; height:40px; width:40px;border-radius:100%"></div>

     
    </div>
   </div>


        <div class="right-main">
            <?php 
                if (!isset($_SESSION['user'])){
                    echo("<script>document.location.href  = 'worlworksoc/auth.php'</script>");
                    die;
                }
                $q = mysqli_query($connections, "SELECT * FROM `users` WHERE `id`=".intval($_SESSION['user']['id']));
                if (mysqli_num_rows($q) == 0){
                    echo("<script>document.location.href  = 'worlworksoc/auth.php'</script>");
                    die;
                }
                $_SESSION['user'] = mysqli_fetch_assoc($q);
                
                $sessionInfo = json_decode($_SESSION['user']['info_json']);
                if (isset($_GET['home'])){
                    include("home.php");
                }else
                if (isset($_GET['pushs'])){
                    include("pushs.php");
                }else
                if (isset($_GET['friends'])){
                    include("friendslist.php");
                }else
                if (isset($_GET['search'])){
                    include("search.php");
                }else
                if (isset($_GET['messages'])){
                    include("messages.php");
                }else
                if (isset($_GET['messages'])){
                    include("messages.php");
                }else if (isset($_GET['news'])){
                    include("news.php");
                }else{
                    ?>
                    <iframe class="frame-start" width="100%" height="100%" src="zgatovki/StartPage/creative-scroll-website/ready-html/index.html"></iframe>
                        <!-- <p style="color:gray; text-align:center; font-size:1.2vw;margin-top:20vh;">Приветствую всех новых пользователей. Слева вы можете видеть панель меню, а справа, та часть в которой текст - основная.<br>
                        Для того чтобы добавить друга, перейдите во вкладку <a href="?friends">"Друзья"</a> и нажмите на кнопку <a href="?search=">"Поиск"</a> в верхней правой части страницы.<br>
                        Для редактирования своей страницы, перейдите во вкладку <a href="?home=">"Дом"</a> и нажмите на карандаш в левом верхнем углу. Для создания поста, на той же странице есть форма.<br>
                         </p> -->
                    <?php
                }
            ?>
        </div>
        
    </div>
    
</body>
</html>
