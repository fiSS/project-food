<?php
//все то что приходит от клиента будет декодировать из JSON
//как на php коде получить JSON данные и с ними поработать
$_POST = json_decode(file_get_contents("php://input"), true);
echo var_dump($_POST);
// эта команда берет те данные которые пришли с клиента превращает их в строку и показывает обратно на клиенте
// тот response который будет приходить с сервера