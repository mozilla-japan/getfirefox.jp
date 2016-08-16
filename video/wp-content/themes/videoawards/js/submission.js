function toggleLoftworkField() {
	if ($('loftworkData').getStyle('display') == 'none') {
		$('loftworkData').setStyle('display', 'block');
	} else {
		$('loftworkData').setStyle('display', 'none');
	}
}

function getLoftworkData() {
	var url = '/video/ajax/ajax_loftwork.php';
	var creatorName;
	var emailAddress;
	var g_jsonRequest;

	// get values from form fields
	creatorName = $('creatorname').getValue();
	emailAddress = $('email').getValue();

	// show loading gif
	$('loftworkLoadingImg').setStyle('display', 'block');

	g_jsonRequest = new Json.Remote(
		url, 
		{
			onComplete: function(jsonObj) {
				setFormFields(jsonObj.creator);
				$('loftworkLoadingImg').setStyle('display', 'none');
			}
		}
	).send({'creator': creatorName, 'email': emailAddress});
}

function setFormFields(creatorObj) {
	$('lastnamekanji').setValue(creatorObj[0].last_name_kanji);
	$('lastnamekana').setValue(creatorObj[0].last_name_kana);
	$('firstnamekanji').setValue(creatorObj[0].first_name_kanji);
	$('firstnamekana').setValue(creatorObj[0].first_name_kana);	
	$('profile').setValue(creatorObj[0].profile);
	$('website').setValue(creatorObj[0].website_url);
	$('nickname').setValue(creatorObj[0].creator_name);
	$('prefecture').setValue(creatorObj[0].prefecture);
	$('yob').setValue(creatorObj[0].yob + '年');
	if (creatorObj[0].avatar_url != '') {
		var imageURL = creatorObj[0].avatar_url;
		$('loftworkAvatarPreview').setStyle('display', 'block');
		$('loftworkAvatarIMG').src = imageURL;
		$('loftworkavatarurl').setValue(creatorObj[0].avatar_url);
		$('uploadTxt').innerHTML = 'Loftworkアバターを使用しない場合は、ブラウズボタンをクリックして、画像をアップロードしてください。';
	}
}

function showLoadingScreen() {
	$('overlay').setStyle('display', 'block');
	$('overlayContentContainer').setStyle('display', 'block');
	$('loadingMsg').setStyle('display', 'block');
	document.body.style.overflow = 'hidden';
}

Element.extend({
	setValue : function(val) {
		switch (this.getTag()) {
			case 'select':
				for (var i = 0; i < this.options.length; i++) {
					if (this.options[i].text == val) {
						this.selectedIndex = i;
						break;
					}
				}
				break;
			case 'input': 
				if (['checkbox', 'radio'].contains(this.type)) {
					this.checked = (($type(val)=='array') ? val.contains(this.value) : (this.value==val));
				} else if (['hidden', 'text', 'password'].contains(this.type.toString())) {
					this.value = val;
				}
				break;
            case 'textarea': 
            	this.value = val;
            	break;
			// if element isn't a input, set the text
            default: 
            	if($type(val) != 'array') {
            		this.setText(val);
            	}
		}
		return this;
	}
});
	