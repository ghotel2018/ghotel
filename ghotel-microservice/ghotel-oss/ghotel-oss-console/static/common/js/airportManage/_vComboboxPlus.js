(function ($) {
    $.extend($.fn.combobox.defaults, {
        filter: function (input, row) {
            // 清空内容, 则不过滤
            if (input == "") return true;

            input = input.toUpperCase();

            // 先判断显示值
            var opts = $(this).combobox('options');
            var text = row[opts.textField].toUpperCase();
            if (text.indexOf(input) >= 0) {
                return true;
            }

            var letter = text.toPinyin();
            var py = letter.toParsePy().toUpperCase();
            letter = letter.replace(/\s+/g, "").toUpperCase();

            if (letter.indexOf(input) >= 0 || py.indexOf(input) >= 0) {
                return true;
            }
            return false;

            // 默认不过滤
            return true;
        }
    });

})(jQuery);
