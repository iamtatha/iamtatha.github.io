var code = new Array(36);
code['0'] = '111000111000111000111000111'   //0
code['1'] = '1000111000111000111000111'   //1
code['2'] = '10001000111000111000111'   //2
code['3'] = '100010001000111000111'   //3
code['4'] = '1000100010001000111'   //4
code['5'] = '10001000100010001'   //5
code['6'] = '1110001000100010001'   //6
code['7'] = '111000111000100010001'   //7
code['8'] = '11100011100011100010001'   //8
code['9'] = '1110001110001110001110001'   //9
code['10'] = '1000111'  //a
code['11'] = '111000100010001'  //b
code['12'] = '11100010001110001'  //c
code['13'] = '11100010001'  //d
code['14'] = '1'  //e
code['15'] = '100010001110001'  //f
code['16'] = '1110001110001'  //g
code['17'] = '1000100010001'  //h
code['18'] = '10001'  //i
code['19'] = '1000111000111000111'  //j
code['20'] = '1110001000111'  //k
code['21'] = '100011100010001'  //l
code['22'] = '111000111'   //m
code['23'] = '1110001'   //n
code['24'] = '111000111000111'   //o
code['25'] = '10001110001110001'   //p
code['26'] = '1110001110001000111'   //q
code['27'] = '10001110001'   //r
code['28'] = '100010001'   //s
code['29'] = '111'   //t
code['30'] = '10001000111'   //u
code['31'] = '100010001000111'   //v
code['32'] = '1000111000111'   //w
code['33'] = '11100010001000111'   //x
code['34'] = '1110001000111000111'   //y
code['35'] = '11100011100010001'   //z


function copy() {
    var copyText = document.getElementById("morse_output");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    //alert("Copied the text: " + copyText.value);
}

function into_morse() {

    var str = document.getElementById("morse_input").value;
    str = str.replace(/\s+/g, ' ').trim();
    //console.log(str);
    var text = str.toString().toLowerCase();
    var output = "";
    var i;
    //console.log(text);
    for (i = 0; i < text.length; i++) {
        var ascii = text[i].charCodeAt(0);
        if ((text[i] == ' ') && (i != text.length - 1) && (text[i + 1] != '.') && (i != 0) && (text[i - 1] != '.')) {
            output = output.concat('  ');  						//2 spaces - word gap
        }

        else if ((text[i] == ' ') && ((text[i + 1] == '.') || (text[i - 1] == '.'))) {
            output = output.concat('');
        }

        else if (text[i] == '.') {
            output = output.concat('   ');  						//3 spaces - fullstop
        }
        else {
            if (ascii < 58)
                ascii = ascii - 48;
            else
                ascii = ascii - 87;
            //console.log(code[ascii]);
            output = output.concat(code[ascii]);
            if ((i != text.length - 1) && (text[i + 1] != ' ') && (text[i + 1] != '.')) {
                output = output.concat(' ');  						//1 spaces - letter gap
                //console.log(output);
            }
        }
    }
    //console.log(output);
    while ((output.split("111").length - 1) > 0) {
        output = output.replace("111", "-");
    }
    //console.log(output);
    while ((output.split("1").length - 1) > 0) {
        output = output.replace("1", ".");
    }
    //console.log(output);
    while ((output.split("000").length - 1) > 0) {
        output = output.replace("000", "");  					//0 space - bitgap
    }
    //console.log(output);
    while ((output.split("0").length - 1) > 0) {
        output = output.replace("0", "");  					//0 space - bitgap
    }
    //console.log(output);
    document.getElementById("morse_output").innerHTML = output;
}


function match(n) {

    if (n == '')
        return '';
    var i = 0;
    var index = 0;
    for (i = 0; i < code.length; i++) {
        if (code[i] == n) {
            index = i;
            break;
        }
        //console.log(index);
    }
    if (index < 10)
        index = index + 48;
    else
        index = index + 87;
    var value = String.fromCharCode(index);
    return value;
}


function getword(s) {

    var word = '';
    var letters = s.split(" ");								// 1 spaces - letter gap
    var k = 0;

    for (k = 0; k < letters.length; k++) {
        var letter = '';

        while ((letters[k].split(".").length - 1) > 0) {
            letters[k] = letters[k].replace(".", "1000");
        }


        while ((letters[k].split("-").length - 1) > 0) {
            letters[k] = letters[k].replace("-", "111000");
        }

        letters[k] = letters[k].substring(0, letters[k].length - 3);
        //console.log(letters[k]);
        letter = match(letters[k]);
        word = word.concat(letter);
    }

    return word;
}


function from_morse() {

    var str = document.getElementById("morse_input").value;
    var text = str.toString().toLowerCase();

    var output = "";
    var sentences = text.split("   ");						//3 spaces - Fullstop
    //console.log(sentences);

    var i = 0;
    for (i = 0; i < sentences.length; i++) {


        var words = sentences[i].split("  ");					//2 spaces - word gap
        //console.log(words);
        var sentence = '';
        var j = 0;
        for (j = 0; j < words.length; j++) {

            var word = getword(words[j]);
            //console.log(word);

            if (j != words.length - 1) {
                word = word.concat(' ');
            }
            sentence = sentence.concat(word);
        }

        output = output.concat(sentence);

        if ((i != sentences.length - 1) && (sentences[i + 1].length > 0)) {
            //console.log('yay');
            output = output.concat('.');
            output = output.concat(' ');
        }
        else if ((i == sentences.length - 1) && (text[text.length - 1] == ' ')) {
            //console.log('nay');
            output = output.concat('.');
        }
        else if ((i != sentences.length - 1) && (sentences[i + 1].length == 0) && (sentences[i].length == 0)) {
            output = output.concat('.');
        }
    }

    document.getElementById("morse_output").innerHTML = output;
}