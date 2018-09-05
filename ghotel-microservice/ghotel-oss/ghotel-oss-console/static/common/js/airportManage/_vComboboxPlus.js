(function ($) {
    $.extend($.fn.combobox.defaults, {
        filter: function (input, row) {
            // �������, �򲻹���
            if (input == "") return true;

            input = input.toUpperCase();

            // ���ж���ʾֵ
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

            // Ĭ�ϲ�����
            return true;
        }
    });

})(jQuery);
