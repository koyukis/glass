<?php
print <<< END_DOC
<HTML>
<HEAD>
<title>記録完了！</title>
</HEAD>
<BODY>
END_DOC;

$name = $_POST[name];
$comment = $_POST[comment];

$filnam = "inpfrmf.cgi";
$fp = fopen($filnam,"a");
fputs($fp,"$name,$comment\n");
fclose($fp);

print "記録完了！<br><br>\n";
print "名前：$name<br>\n";
print "コメント：$comment<br>\n";

print <<< END_DOC
</BODY>
</HTML>
END_DOC;

?>