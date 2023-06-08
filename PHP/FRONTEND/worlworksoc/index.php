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
    
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"></script>
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
        echo("<script>document.location.href  = '/auth.php'</script>");
         die;
    }
    $user = mysqli_fetch_assoc(mysqli_query($connections, "SELECT * FROM `users` WHERE `id`=".intval($_SESSION['user']['id'])));

    $info = json_decode($user['info_json']);
}
?>


    <?php if (isset($_GET['exit'])){
       unset($_SESSION['user']);
    } 
    $check =  mysqli_query($connections, "SELECT * FROM `pushes` WHERE (`userid`={$_SESSION['user']['id']})");
    if (mysqli_num_rows($check) != 0){
        ?>
        <style>
        #pushb{
            box-shadow: 0px 0px 13px red;
            background: unset;
        }
        </style>
        <?php
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
     <div class="logo">WorlWorkSoc</div>
     <div class="search-bar">
      <input type="text" placeholder="Search..." />
     </div>
    </div>
    <div class="header-menu">
     <!-- <div class="menu-item">Home</div>
     <div class="menu-item">Categories</div>
     <div class="menu-item notify">Subscriptions</div> -->
    <div class="menu-item" title="Дом"><a  href="?home="> Home</a>   </div>
    <div class="menu-item" title="Новости"><a href="?news=">News</a>   </div>
    <div class="menu-item" title="Сообщения"><a href="?messages=">Messages</a></div>
    <div class="menu-item" title="Уведомления"><a  href="?pushs=">Tongle</a></div>
    <div class="menu-item" title="Друзья"><a href="?friends=">Friends</a></div>
    <!-- <div class="menu-item"><a href=""><img src="icons\group.svg" alt=""></a>  </div> -->
    <div class="menu-item" title="Выйти"><a href="/worlworksoc/?exit=">Exit</a>  </div>
    </div>
    <div class="user-settings">
     <!-- <button class="button">
      <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 512.06 512.06">
       <path d="M426.63 188.22C402.97 93.95 307.37 36.7 213.08 60.37A176 176 0 0080.39 218.3a96 96 0 0016 190.72h80v-32h-80a64 64 0 010-128 16 16 0 0016-16c-.08-79.53 64.33-144.06 143.86-144.14a144 144 0 01141.42 116.14 16 16 0 0013.6 12.8 80 80 0 01-10.88 159.2h-64v32h64c61.86-.18 111.85-50.48 111.66-112.34a112 112 0 00-85.41-108.46z" />
       <path d="M245.03 253.66l-64 64 22.56 22.56 36.8-36.64v153.44h32V303.58l36.64 36.64 22.56-22.56-64-64a16 16 0 00-22.55 0z" /></svg>
      Upload
     </button> -->
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 492 492">
      <path d="M484.13 124.99l-16.11-16.23a26.72 26.72 0 00-19.04-7.86c-7.2 0-13.96 2.79-19.03 7.86L246.1 292.6 62.06 108.55c-5.07-5.06-11.82-7.85-19.03-7.85s-13.97 2.79-19.04 7.85L7.87 124.68a26.94 26.94 0 000 38.06l219.14 219.93c5.06 5.06 11.81 8.63 19.08 8.63h.09c7.2 0 13.96-3.57 19.02-8.63l218.93-219.33A27.18 27.18 0 00492 144.1c0-7.2-2.8-14.06-7.87-19.12z" /></svg>
      <div style="color:#fff;"><?php echo($user['name']);?></div>
      <div class="img" style="background-image: url(<?php echo($info->avatar) ?>);background-repeat: no-repeat;background-size: cover; height:40px; width:40px;border-radius:100%"></div>

     
    </div>
   </div>


        <div class="right-main">
            <?php 
                if (!isset($_SESSION['user'])){
                    echo("<script>document.location.href  = '/auth.php'</script>");
                    die;
                }
                $q = mysqli_query($connections, "SELECT * FROM `users` WHERE `id`=".intval($_SESSION['user']['id']));
                if (mysqli_num_rows($q) == 0){
                    echo("<script>document.location.href  = '/auth.php'</script>");
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
                        <p style="color:gray; text-align:center; font-size:1.2vw;margin-top:20vh;">Приветствую всех новых пользователей. Слева вы можете видеть панель меню, а справа, та часть в которой текст - основная.<br>
                        Для того чтобы добавить друга, перейдите во вкладку <a href="?friends">"Друзья"</a> и нажмите на кнопку <a href="?search=">"Поиск"</a> в верхней правой части страницы.<br>
                        Для редактирования своей страницы, перейдите во вкладку <a href="?home=">"Дом"</a> и нажмите на карандаш в левом верхнем углу. Для создания поста, на той же странице есть форма.<br>
                         </p>
                    <?php
                }
            ?>
        </div>
    </div>
</body>
</html>
