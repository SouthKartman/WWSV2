<script>



var myInterval = null; 
var userid = -1;
var username = "";
var myname = "<?php echo $_SESSION['user']['name']; ?>";
var myid = <?php echo $_SESSION['user']['id']; ?>;
    var recive = false;
function startLoop(id, name) {
    
    if (recive == true) return true;

    $('.mess-gen').remove();
    userid=id;
    username=name;
    clearInterval(myInterval);
    $(".main_input").css("display", "flex");
    var main = $("#m-main");
    var objDiv = $(".main__chat");
    var last = 0;
    var i = 0;
    
    myInterval = setInterval(function() {
        userid=id;
        username=name;
        $.getJSON("messageworks.php?id="+userid+"&type=view", function(data) {
            i = 0;
            $('.mess-gen').remove();
            console.log(data);
            data.forEach(element => {
                if (i > 50) return false;
                var clone = main.clone(true);
                clone.appendTo(".main__chat");
                var str = "";
                if (element.id == userid){
                    str += username + ":<br>";
                }else{
                    str += myname + ":<br>";
                    clone.css("margin-left","36%");
                }

                clone.find("p").html(str+(element.text));
                clone.css("display","block");
                clone.attr("class","mess-gen");
                
                i++;
            });
        });
        if (last != i){
            var div = document.getElementById("idmess");
            div.scrollTop = div.scrollHeight - div.clientHeight;
            last = i;
        }
    }, 1000);
    
    var div = document.getElementById("idmess");
            div.scrollTop = div.scrollHeight - div.clientHeight;
}

function send() {
    console.log("messageworks.php?id="+userid+"&text="+$("#mess").val().replace(/\r\n|\r|\n/g,"<br />")+"&type=send");
    $.getJSON("messageworks.php?id="+userid+"&text="+$("#mess").val().replace(/\r\n|\r|\n/g,"<br />")+"&type=send", function(data) {});
    $("#mess").val("");
    var div = document.getElementById("idmess");
    div.scrollTop = div.scrollHeight - div.clientHeight;
}

</script>



<div class="messages-main">
    <div class="m-left">
    <?php
        $allfriends = $sessionInfo->friends;
        for ($i=0; $i < count($allfriends); $i++) { 
            if ($allfriends != ''){
                $user = mysqli_fetch_assoc(mysqli_query($connections, "SELECT * FROM `users` WHERE `id`=".$allfriends[$i]));
                ?>
                    <div class="messages-friend" onclick="startLoop(<?php echo $user['id'].',\''.$user['name'].'\''; ?>)">
                        <div style="background-image:url(<?php echo(json_decode($user['info_json'])->avatar);?>);width:3vw; height:3vw; background-repeat: no-repeat;background-size: contain;"></div>
                        <h2><?php echo($user['name']); ?></h2>
                    </div>
                <?php
            }
        }
    ?>
    </div>
    <div class="m-right">
        <div class="messages" id="idmess">
            <div class="message" id="m-main" style="display:none; margin-left:0%">
                <p>ebal1</p>
            </div>
        </div>
        <div style="margin-left:4%; width:92%;color:black;">
        <p id="sobesed" style="float:left"></p>
        <p id="your" style="float:right"></p>
        </div>
        <div class="user-input" style="display:none">
            <textarea name="message" id="mess" cols="30" rows="10"></textarea>
            <img draggable="false" style="width:5%;cursor:pointer;" src="webicons/send.svg" alt="" onclick="send()">
        </div>
    </div>
</div>

<link rel="stylesheet" href="styles/message.css">

<div class="grid">
        <div class="nav">
            <div class="nav__container">

            <?php
                         $allfriends = $sessionInfo->friends;
                         for ($i=0; $i < count($allfriends); $i++) { 
                             if ($allfriends != ''){
                                 $user = mysqli_fetch_assoc(mysqli_query($connections, "SELECT * FROM `users` WHERE `id`=".$allfriends[$i]));
            ?>

                <div class="nav__server" onclick="startLoop(<?php echo $user['id'].',\''.$user['name'].'\''; ?>)"><div style="background-image:url(<?php echo(json_decode($user['info_json'])->avatar);?>); min-width:3rem; min-height:3rem; border-radius:50%;background-size: cover; background-repeat: no-repeat;"></div></div>
            
                <?php
            }
        }
    ?>

            </div>
        </div>
        <div class="header">
            <div class="header__container">
                <div class="header__server">
                    <div class="server__title">Server</div>
                </div>
                <div class="header__channel">
                    <div class="channel__item">
                        <div class="channel__group">Text channels</div>
                        <div class="channel__title">General</div>
                        <div class="channel__title">Games</div>
                        <div class="channel__title">Away</div>
                    </div>
                    <div class="channel__item">
                        <div class="channel__group">Voice channels</div>
                        <div class="channel__title">General</div>
                        <div class="channel__title">Games</div>
                        <div class="channel__title">Away</div>
                    </div>
                </div>
                <div class="header__profile">
                    <div class="profile__badge">
                        <div class="profile__avatar">
                            <div class="avatar__status"></div>
                        </div>
                        <div class="profile__user">
                            <div class="user__name">Username</div>
                            <div class="user__id">1234</div>
                        </div>
                    </div>
                    <div class="profile__settings">
                        <div class="profile__setting"></div>
                        <div class="profile__setting"></div>
                        <div class="profile__setting"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="main__container">
                <div class="main__channel">
                    <div class="header__title"># Сообщения</div>
                </div>
                <div class="main__chat" id="idmess">
                    <!-- <div class="main__post">
                        <div class="post__avatar"></div>
                        <div class="post__content">
                            <div class="post__name">Username</div>
                            <div class="post__timestamp">Timestamp</div>
                            <div class="post__message" id="m-main">Lorem Ipsum</div>
                        </div>

                        <div style="margin-left:4%; width:92%;">
                            <p id="sobesed" style="float:left"></p>
                            <p id="your" style="float:right"></p>
                        </div>
                        
                    </div> -->
                    <!-- <div class="messages" id="idmess"> -->
            <div class="message" id="m-main" style="display:none; margin-left:0%">
                <p>ebal1</p>
            </div>
        <!-- </div> -->
        <div style="margin-left:4%; width:92%;color:black;">
        <p id="sobesed" style="float:left"></p>
        <p id="your" style="float:right"></p>
        </div>
        <!-- <div class="user-input" style="display:none">
            <textarea name="message" id="mess" cols="30" rows="10"></textarea>
            <img draggable="false" style="width:5%;cursor:pointer;" src="webicons/send.svg" alt="" onclick="send()">
        </div> -->
                </div>
                <div class="main_input" style="display:none;">
                    <div class="input__container">
                        <input class="user-input"  name="message" id="mess" cols="30" rows="10" placeholder="Enter message"></input>
                    </div>
                    <img draggable="false" style="width:5%;cursor:pointer;" src="webicons/send.svg" alt="" onclick="send()">
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footer__container">
                <div class="footer__settings">
                    <div class="settings__group">
                        <div class="group__setting"></div>
                        <div class="group__setting"></div>
                        <div class="group__setting"></div>
                    </div>
                    <!-- <input class="search__input" type="text" /> -->
                </div>
                <div class="footer__friends">
                    <div class="friend__category">List Friends</div>
                     <?php
                         $allfriends = $sessionInfo->friends;
                         for ($i=0; $i < count($allfriends); $i++) { 
                             if ($allfriends != ''){
                                 $user = mysqli_fetch_assoc(mysqli_query($connections, "SELECT * FROM `users` WHERE `id`=".$allfriends[$i]));
                 ?>
                    <div class="friend" onclick="startLoop(<?php echo $user['id'].',\''.$user['name'].'\''; ?>)">
                        <div class="friend__avatar">
                            <div class="avatar__status"><div style="background-image:url(<?php echo(json_decode($user['info_json'])->avatar);?>); min-width:2rem; min-height:2rem; border-radius:50%;background-size: cover; background-repeat: no-repeat;"></div></div>
                        </div>

                        <div class="friend__user">
                            <div class="user__name"><p><?php echo($user['name']); ?></p></div>
                        </div>

                    </div>

                    
                <?php
            }
        }
    ?>



                        
                    
                </div>
            </div>
        </div>
    </div>