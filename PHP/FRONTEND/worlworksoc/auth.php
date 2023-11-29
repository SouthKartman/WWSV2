<?php include("include/config.php"); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auth</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <!-- <link rel="stylesheet" href="styles.css"> -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <link rel = "stylesheet" href="styles/auth.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"></script>
    
    <script src="logreg.js"></script>
</head>
<body style="overflow:hidden; color: white;">
    <?php
        if (isset($_POST['go_reg'])){

            $g = mysqli_query($connections, "SELECT * FROM `users` WHERE `login`='{$_POST['login']}'");

            if (mysqli_num_rows($g) == 0){
                $info = array(
                    'location' => trim($_POST['mest_jit']),
                    'born' => trim($_POST['rodil']),
                    'job' => trim($_POST['rab']),
                    'study' => trim($_POST['uch']),
                    'type' => trim($_POST['polog']),
                    'hobby' => trim($_POST['evlech']),
                    'email' => trim($_POST['mail']),
                    'background' =>"img/background.jpg",
                    'avatar' => "img/avatar.jpg",
                    'friends' => array()
                    
                );
                $info_json = (json_encode($info,JSON_UNESCAPED_UNICODE));
                $posts = json_encode(array(),JSON_UNESCAPED_UNICODE);
                $pass = password_hash($_POST['password'],PASSWORD_DEFAULT);
                mysqli_query($connections, "INSERT INTO `users` (`name`, `login`, `password`, `info_json`, `posts_json`) VALUES ('{$_POST['login']}', '{$_POST['login']}', '{$pass}', '{$info_json}', '{$posts}')");
                echo("<script>document.location.href  = '/worlworksoc/auth.php'</script>");
            }else{
                echo("Эти данные уже используются."); 
            }

            
        }
        if (isset($_POST['go_log'])){
            $loginEx = mysqli_query($connections, "SELECT * FROM `users` WHERE `login`='{$_POST['login']}'");
            
            if (mysqli_num_rows($loginEx) == 1){
                $loginExFetch = mysqli_fetch_assoc($loginEx);
                if (password_verify($_POST['password'], substr( $loginExFetch['password'], 0, 60 ))){

                    $_SESSION['user'] = $loginExFetch;
                    echo("<script>document.location.href  = '/worlworksoc/index.php'</script>");
                }else{
                    echo("Неверные данные");
                }
            }else{
                echo("Неверные данные");
            }
        }
    ?>
    <!-- <style>
        input{
            font-size:2vw;
            margin-top:2vw;
            border-style: solid;
            background:unset;
        }
        #login{
            position:absolute;
            width:fit-content; box-shadow: 0px 5px 20px rgb(20,20,20); padding:1vw; margin-top: 30vh;
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;

            transition:0.5s;
        }
        #reg{
            position:absolute;
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            width:fit-content; box-shadow: 0px 5px 20px rgb(20,20,20); padding:1vw; margin:0 auto; margin-top: 10vh;
            transition:0.5s;
            margin-top:200vh;
        }
    </style> -->
    <!-- <p style="position:absolute; bottom:0;right:0;">В браузерах MSEdge, Explorer и подобных, вёрстка может отображаться некорректно</p>
    <div id="login" style=" <?php if (isset($_POST['go_reg'])) {echo("margin-top:-100vh;"); }else{echo("margin-top:30vh;");} ?>">
        <form action="#" method="POST">    
            <h1>Вход: </h1>
            <input type="text" placeholder="Логин" name="login" minlength="4" required><br>
            <input type="password" placeholder="Пароль" name="password" minlength="6" required>
            <p style="text-align:right; margin-top:1vw;cursor:pointer;" onclick="toRegister()" >Регистрация</p>
            <input type="submit" value="Вход" style="width:100%;" name="go_log">
            
        </form>
    </div>


    <div id="reg" style=" <?php if (isset($_POST['go_reg'])) {echo("margin-top:10vh;");}else{echo("margin-top:200vh;");   } ?>">
        <form action="#" method="POST">        
            <h1>Регистрация: </h1>
            <div style="display:flex;">
                <div style="margin-right:2vw;">
                    <input type="text" placeholder="Логин*" name="login" minlength="4" required><br>
                    <input type="password" placeholder="Пароль*" name="password" minlength="6" required><br>
                    <input type="email" placeholder="Mail*" name="mail" required><br>
                </div>
                <div>
                    <input type="text" placeholder="Место жительства" name="mest_jit"><br>
                    <input type="text" placeholder="Родился" name="rodil"><br>
                    <input type="text" placeholder="Работает" name="rab"><br>
                    <input type="text" placeholder="Учился/Учится" name="uch"><br>
                    <input type="text" placeholder="Семейное положение" name="polog"><br>
                    <input type="text" placeholder="Увлечение" name="evlech"><br>
                </div>
            </div>
            <p style="text-align:right; margin-top:1vw;cursor:pointer;" onclick="toLogin()" >Вход</p>
            <input type="submit" value="Зарегистрироватся" style="width:100%;" name="go_reg">
        </form>
    </div> -->

    







    <div class="container">
  <div class="overlay" id="overlay">
    <div class="sign-in" id="sign-in">
      <h1>Welcome Back!</h1>
      <p>Чтобы оставаться на связи с нами, войдите под своей личной информацией</p>
      <button class="switch-button" id="slide-right-button">Sign In</button>
    </div>
    <div class="sign-up" id="sign-up">
      <h1 class="LOGO">Smart
        Social</h1>
      <p>Введите свои личные данные и начните путешествие с нами</p>
      <button class="switch-button" id="slide-left-button">Sign Up</button>
    </div>
  </div>
  <div class="form">
    <div class="sign-in" id="sign-in-info">
      <h1>Sign In</h1>
      <div class="social-media-buttons">
        
        
      </div>
      <p class="small">Используйте свою данные аккаунта:</p>
      <form id="sign-in-form" id="login" method="POST">      
        <input placeholder="Логин" name="login" minlength="4" required/>
        <input type="password" placeholder="Пароль" name="password" minlength="6" required/>
<!--         <p class="forgot-password">Forgot your password?</p> -->
        <button class="control-button in" name="go_log">Sign In</button>
      </form>
    </div>
    <div class="sign-up" id="sign-up-info">
      <h1>Создать Аккаунт</h1>
      <div class="social-media-buttons">
        <div>
          <p class="small" >
            
          </p>
        </div>
      </div>
      <p class="small">Используйте свою электронную почту для регистрации:</p>
      <form id="sign-up-form" method="POST">
        <input type="text" placeholder="Логин*" name="login" minlength="4" required/>
        <input type="password" placeholder="Пароль*" name="password" minlength="6" required />
        <input type="email" placeholder="Mail*" name="mail" required/>
        <input type="text" placeholder="Место жительства" name="mest_jit"/>
        
        <input type="text" class="mask-date form-control" placeholder="dd/mm/yyyy" data-slots="dmyh" name="rodil"/>
        <script src="/js/jquery.min.js"></script>
        <script src="/js/jquery.maskedinput.min.js"></script>   
        <script>// This code empowers all input tags having a placeholder and data-slots attribute
document.addEventListener('DOMContentLoaded', () => {
    for (const el of document.querySelectorAll("[placeholder][data-slots]")) {
        const pattern = el.getAttribute("placeholder"),
            slots = new Set(el.dataset.slots || "_"),
            prev = (j => Array.from(pattern, (c,i) => slots.has(c)? j=i+1: j))(0),
            first = [...pattern].findIndex(c => slots.has(c)),
            accept = new RegExp(el.dataset.accept || "\\d", "g"),
            clean = input => {
                input = input.match(accept) || [];
                return Array.from(pattern, c =>
                    input[0] === c || slots.has(c) ? input.shift() || c : c
                );
            },
            format = () => {
                const [i, j] = [el.selectionStart, el.selectionEnd].map(i => {
                    i = clean(el.value.slice(0, i)).findIndex(c => slots.has(c));
                    return i<0? prev[prev.length-1]: back? prev[i-1] || first: i;
                });
                el.value = clean(el.value).join``;
                el.setSelectionRange(i, j);
                back = false;
            };
        let back = false;
        el.addEventListener("keydown", (e) => back = e.key === "Backspace");
        el.addEventListener("input", format);
        el.addEventListener("focus", format);
        el.addEventListener("blur", () => el.value === pattern && (el.value=""));
    }
});</script>
        <input type="text" placeholder="Статус" name="rab"/>
        <input type="text" placeholder="Учился/Учится" name="uch"/>
        <input type="text" placeholder="Семейное положение" name="polog"/>
        <input type="text" placeholder="Увлечение" name="evlech"/>
        <button type="submit" value="Зарегистрироватся" name="go_reg" class="control-button up">Sign Up</button>
      </form>
    </div>
  </div>
</div>
</body>
<script src="js/authform.js"></script>

</html>