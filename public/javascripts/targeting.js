(function(window){
    var data = {
            countries: {label: "Countries", type: "multiple", choices: ["Åland Islands","Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua And Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia And Herzegovina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (keeling) Islands","Colombia","Comoros","Congo","Congo, The Democratic Republic Of The","Cook Islands","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","CÔte D'ivoire","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands (malvinas)","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-bissau","Guyana","Haiti","Heard Island And Mcdonald Islands","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran, Islamic Republic Of","Iraq","Ireland","Isle Of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Korea, Democratic People's Republic Of","Korea, Republic Of","Kuwait","Kyrgyzstan","Lao People's Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libyan Arab Jamahiriya","Liechtenstein","Lithuania","Luxembourg","Macao","Macedonia, The Former Yugoslav Republic Of","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia, Federated States Of","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territory, Occupied","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Romania","Russian Federation","Rwanda","RÉunion","Saint BarthÉlemy","Saint Helena","Saint Kitts And Nevis","Saint Lucia","Saint Martin","Saint Pierre And Miquelon","Saint Vincent And The Grenadines","Samoa","San Marino","Sao Tome And Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia And The South Sandwich Islands","Spain","Sri Lanka","Sudan","Suriname","Svalbard And Jan Mayen","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan, Province Of China","Tajikistan","Tanzania, United Republic Of","Thailand","Timor-leste","Togo","Tokelau","Tonga","Trinidad And Tobago","Tunisia","Turkey","Turkmenistan","Turks And Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Vanuatu","Vatican City State","Venezuela","Viet Nam","Virgin Islands, British","Virgin Islands, U.s.","Wallis And Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"]},
            gender: {label: "Gender", type: "single", choices: ["male", "female", "unknown"]}
        },
        uniqID = 0,
        $protoDiv = $('<div class="control-group"><span class="choiceContainer"/><span class="selectContainer"/></div>'),
        $protoChoice,
        $protoSelect = $('<select data-placeholder="Select something..." class="chzn-select input-large"/>'),
        $protoMultiple = $protoSelect.clone().attr('multiple', true),
        $protoOption = $('<option/>'),
        $addButton,
        $cont;

    function getNewChoice() {
        if (!$protoChoice) {
            populateProtoChoices();
        }
        var $div = $protoDiv.clone();
        $div
            .find('.choiceContainer')
            .append(
                $protoChoice
                    .clone()
                    .attr('id', 'choice_' + uniqID++)
                    .on('change', onChangeChoice)
            );
        return $div;
    }

    function populateProtoChoices() {
        if (!$protoChoice) {
            $protoChoice = $protoSelect.clone();
            _.each(data, function(value, key) {
                $protoChoice.append(
                    $protoOption
                        .clone()
                        .attr('value', key)
                        .text(value.label)
                );
            });
            $protoChoice.prepend(
                $protoOption.clone()
            );
        }
        return $protoChoice;
    }

    function getSelectElement(dataSet) {
        var $el = (dataSet.type === 'single' ? $protoSelect : $protoMultiple).clone();
        _.each(dataSet.choices, function(choice){
            $el.append(
                $protoOption
                    .clone()
                    .attr('value', choice)
                    .text(choice)
            );
        });

        return $el;
    }

    function onChangeChoice(event) {
        var target = event.target,
            selectedValue = target.options[target.selectedIndex].value,
            dataSet = data[selectedValue];
            $selectEl = getSelectElement(dataSet);
        if (selectedValue !== 'default') {
            $(target)
                .parent()
                .parent()
                .find('.selectContainer')
                .empty()
                .append(
                    $selectEl
                );
            $selectEl.chosen();
            $addButton.show();
        } else {
            $addButton.hide();
        }
    }

    $(document).ready(function(){
        $cont = $('#container');
        $addButton = $('#add-button')
            .on('click', function(){
                var $el = getNewChoice();
                $cont.append($el);
                $el.find('.chzn-select').chosen();
                $(this).hide();
            });
    });
}(window));