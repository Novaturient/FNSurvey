function onCloseSurvey(row) {
	
	var record = row.row.getRecord();
    var surveyId = record.getValue('survey.survey_id');
	
    View.confirm(getMessage('closeActionConfirmMessage'), function(button) {
	    if (button == 'yes') {
			 var result = null;
			 try {
				 result = Workflow.callMethod('AbAssetManagement-AssetMobileService-closeSurvey', surveyId);
			 }catch (e) {
			   	if (e.code=='ruleFailed'){
			   	  View.showMessage(e.message);
			   	}else{
			   	  Workflow.handleError(e);
			   	}
			   	return;
			 }
			 
			 if (result.code == 'executed') {
				View.panels.get('surveyGrid').refresh();
			 }
		}
	});
}



function showCalendar(){
	//document.getElementById("AFMCALENDAR_abViewdefEditformDrilldownConsole_detailsPanelabViewdefEditformDrilldownConsole_detailsPanel_ta_audit_comp.survey_date").style.display = 'inline';
	document.getElementById("AFMCALENDAR_abViewdefEditformDrilldownConsole_detailsPanel_ta_audit_comp.survey_date").style.display = 'inline';
	document.getElementById("AFMCALENDAR_abViewdefEditformDrilldownConsole_detailsPanel_ta_audit_comp.survey_date").style.visibility = 'visible';
	document.getElementById("AFMCALENDAR_abViewdefEditformDrilldownConsole_detailsPanel_ta_audit_comp.survey_date").style.width = '15px';
	document.getElementById("AFMCALENDAR_abViewdefEditformDrilldownConsole_detailsPanel_ta_audit_comp.survey_date").style.height = '15px';
	document.getElementById("AFMCALENDAR_abViewdefEditformDrilldownConsole_detailsPanel_ta_audit_comp.survey_date").style.left = '10px';
	
	document.getElementById("AFMCALENDAR_taAuditDetailsForm_ta_audit.date_last_surveyed").style.display = 'inline';
	document.getElementById("AFMCALENDAR_taAuditDetailsForm_ta_audit.date_last_surveyed").style.visibility = 'visible';
	document.getElementById("AFMCALENDAR_taAuditDetailsForm_ta_audit.date_last_surveyed").style.width = '10px';
	document.getElementById("AFMCALENDAR_taAuditDetailsForm_ta_audit.date_last_surveyed").style.height = '10px';
	document.getElementById("AFMCALENDAR_taAuditDetailsForm_ta_audit.date_last_surveyed").style.left = '10px';
	
	document.getElementById("AFMCALENDAR_taAuditDetailsFormMod_ta_audit.date_last_surveyed").style.display = 'inline';
	document.getElementById("AFMCALENDAR_taAuditDetailsFormMod_ta_audit.date_last_surveyed").style.visibility = 'visible';
	document.getElementById("AFMCALENDAR_taAuditDetailsFormMod_ta_audit.date_last_surveyed").style.width = '10px';
	document.getElementById("AFMCALENDAR_taAuditDetailsFormMod_ta_audit.date_last_surveyed").style.height = '10px';
	document.getElementById("AFMCALENDAR_taAuditDetailsFormMod_ta_audit.date_last_surveyed").style.left = '10px';
	
}

function onCompleteSurvey(row) {
	var record = row.row.getRecord();
    var surveyId = record.getValue('survey.survey_id');
	var res = new Ab.view.Restriction();
	var ninjaForm = View.panels.get('ninjaForm');
	var surveyGrid = View.panels.get('surveyGrid');
	
	res.addClause('survey.survey_id', surveyId, '=');
	ninjaForm.refresh(res);
	ninjaForm.setFieldValue('survey.status', 'Completed');
	ninjaForm.save();
	
	surveyGrid.refresh();
}

function editFurniture(row) {
	var record = row.row.getRecord();
    var ta_modular = record.getValue('ta_audit.ta_modular');
	var res = new Ab.view.Restriction();
	res.addClause('ta_audit.ta_id',record.getValue('ta_audit.ta_id'),'=');
	res.addClause('ta_audit.survey_id',record.getValue('ta_audit.survey_id'),'=');
	var ninjaForm = View.panels.get('ninjaForm');
	var surveyGrid = View.panels.get('surveyGrid');
	
	
	
	
	document.getElementById("AFMCALENDAR_taAuditDetailsForm_ta_audit.date_last_surveyed").style.display = 'inline';
	document.getElementById("AFMCALENDAR_taAuditDetailsForm_ta_audit.date_last_surveyed").style.visibility = 'visible';
	document.getElementById("AFMCALENDAR_taAuditDetailsForm_ta_audit.date_last_surveyed").style.width = '30px';
	document.getElementById("AFMCALENDAR_taAuditDetailsForm_ta_audit.date_last_surveyed").style.height = '30px';
	document.getElementById("AFMCALENDAR_taAuditDetailsForm_ta_audit.date_last_surveyed").style.left = '15px';
	
	View.panels.get('taAuditDetailsForm').enableField('ta_audit.ta_id', false);
	//alert(record);
	//document.getElementById("ta_fnstd").disabled = false;
	document.getElementById("taAuditDetailsForm_ta_audit.fn_std").disabled = false;
	
	var taForm = View.panels.get('taAuditDetailsForm');
	var taFormMod = View.panels.get('taAuditDetailsFormMod');
	
	
	if (ta_modular=='Yes') {
	//alert(res);
	
	taFormMod.show(true);
	taFormMod.refresh(res);
	//View.panels.get('taAuditDetailsForm').enableField('ta_audit.ta_id', false);
	document.getElementById('furn_std').style.visibility = 'hidden';
	document.getElementById('furn_stdm').style.visibility = 'visible';
	document.getElementById('ta_gen_code').style.visibility = 'hidden';	

	//document.getElementById('taAuditDetailsForm_ta_audit.ta_id_labelCell').innerHTML = 'Unifying Code';	
	taForm.setFieldLabel('ta_audit.ta_id','Unifying Code');
	//getObjectsHTML(taForm);
	//alert(taForm.showField);
	//View.showMessage('',taForm.showField);
	taForm.showField('ta_audit.ta_old',false);
	taForm.showField('ta_audit.tag_number',false);
	taForm.showField('ta_audit.asc_panel_owned',true);
	taForm.showField('ta_audit.asc_panel_shared',true);
	
	}
	else {
		
	taForm.show(true);
	taForm.refresh(res);
		//alert('false');
	//View.panels.get('taAuditDetailsForm').enableField('ta_audit.ta_id', true);
	document.getElementById('furn_std').style.visibility = 'visible';
	document.getElementById('furn_stdm').style.visibility = 'hidden';
	
	taForm.setFieldLabel('ta_audit.ta_id','New Property Control Number');
	taForm.showField('ta_audit.ta_old',true);
	taForm.showField('ta_audit.tag_number',true);	
	taForm.showField('ta_audit.asc_panel_owned',false);
	taForm.showField('ta_audit.asc_panel_shared',false);
	}
	
}

function addFurniture() {
	View.panels.get('taAuditDetailsForm').enableField('ta_audit.ta_id', true);
	var furnForm = View.panels.get('taAuditDetailsForm');
	var ninjaForm = View.panels.get('ninjaForm');
	
	document.getElementById("taAuditDetailsForm_ta_audit.fn_std").disabled = false;
	
	/*if (ninjaForm.getFieldValue('survey.ta_mod')=='No') {
	furnForm.setFieldValue('ta_audit.fn_std',ninjaForm.getFieldValue('survey.ta_fnstd'));
	furnForm.setFieldValue('ta_audit.ta_modular',ninjaForm.getFieldValue('survey.ta_mod'));
	
	}*/
	View.panels.get('taAuditDetailsForm').enableField('ta_audit.ta_id', true);
	
	//document.getElementById('ta_gen_code').style.visibility = 'visible';

	//document.getElementById('furn_std').style.visibility = 'visible';
	//document.getElementById('furn_stdm').style.visibility = 'hidden';
	//document.getElementById('taAuditDetailsForm_ta_audit.ta_id_labelCell').innerHTML = 'Property Control Number';
	furnForm.setFieldLabel('ta_audit.ta_id','New Property Control Number');
	furnForm.showField('ta_audit.ta_old',true);
	furnForm.showField('ta_audit.tag_number',true);	
	
	//View.panels.get('taAuditDetailsForm').setFieldValue('ta_audit.ta_modular','No');
	document.getElementById("ShowtaAuditDetailsForm_ta_audit.ta_modular").innerHTML = "No";
}

function addModular() {
	View.panels.get('taAuditDetailsFormMod').enableField('ta_audit.ta_id', true);
	var furnForm = View.panels.get('taAuditDetailsFormMod');
	var ninjaForm = View.panels.get('ninjaForm');
	
	document.getElementById("taAuditDetailsFormMod_ta_audit.fn_std").disabled = false;
	
	/*if (ninjaForm.getFieldValue('survey.ta_mod')=='Yes') {
	furnForm.setFieldValue('ta_audit.fn_std',ninjaForm.getFieldValue('survey.ta_fnstd'));
	furnForm.setFieldValue('ta_audit.ta_modular',ninjaForm.getFieldValue('survey.ta_mod'));
	
	}*/
	furnForm.setFieldValue('ta_audit.ta_id','AUTOGENERATE');
	
	View.panels.get('taAuditDetailsFormMod').enableField('ta_audit.ta_id', false);
	
	//document.getElementById('furn_std').style.visibility = 'hidden';
	//document.getElementById('furn_stdm_2').style.visibility = 'visible';
	/*document.getElementById('ta_gen_code').style.visibility = 'hidden';
	*/
	//View.panels.get('taAuditDetailsForm').setFieldValue('ta_audit.ta_modular','Yes');
	//ShowtaAuditDetailsForm_ta_audit.ta_modular
	document.getElementById("ShowtaAuditDetailsForm_ta_audit.ta_modular").innerHTML = "Yes";
}

function addComponents(){
	//document.getElementById("abViewdefEditformDrilldownConsole_detailsPanel_ta_audit_comp.fn_std").disabled = true;
	document.getElementById("abViewdefEditformDrilldownConsole_detailsPanel_ta_audit_comp.cmp_std").disabled = false;
		//document.getElementById("taAuditDetailsForm_ta_audit.fn_std").disabled = true;
		//abViewdefEditformDrilldownConsole_detailsPanel


	}

function addComp() {
	var compAddForm = View.panels.get('abViewdefEditformDrilldownConsole_detailsPanel');
	compAddForm.setFieldValue('ta_audit_comp.ta_comp_id', '');
	//console.log(.act);
	//console.log(compAddForm.actions.get('addCompButton2'));
	compAddForm.actions.get('addCompButton3').enable(false);
	compAddForm.actions.get('abViewdefEditformDrilldownConsole_delete').enable(false);
	//document.getElementById("addCompButton2").disabled = true;
	}



function keepSurveyCode() {
	//alert('hey');
	var ta_rm_form = View.panels.get('ascphTaRmAudit_detailsPanel');
			
	var sur_id = View.panels.get('surveyDet').getFieldValue('survey.survey_id');
	
	
	ta_rm_form.setFieldValue('ta_rm_audit.survey_id', sur_id);
	
	ta_rm_form.save();
	
	View.panels.get('ascphTaRmAudit_treePanel').refresh();
	
	ta_rm_form.show(false);
	
	
}

function keepFnStd(a,b,c) {
	//alert(a);
	var furnForm = View.panels.get('taAuditDetailsForm');
	var ninjaForm = View.panels.get('ninjaForm');
	
	if (a=='ta_audit.fn_std') {
	ninjaForm.setFieldValue('survey.ta_fnstd',b);
	}
	if (a=='ta_audit.ta_modular') {
	ninjaForm.setFieldValue('survey.ta_mod',b);
	
	}

}

function modCheckSave() {

	var furnForm = View.panels.get('taAuditDetailsForm');
	var taAuditGrid = View.panels.get('taAuditGrid');
	var surveyGrid = View.panels.get('surveyGrid');
	var aucForm = View.panels.get('ascAucGenerator_detailsPanel');
	var surveyDet = View.panels.get('surveyDet');
	
	if(!checkIfModular()){
		return false;
	}
	
	if (furnForm.getFieldValue('ta_audit.ta_modular')=='Yes' && furnForm.getFieldValue('ta_audit.ta_id')=='AUTOGENERATE') {
	// alert('true');
		if(furnForm.canSave()){
			var survey_id = surveyDet.getFieldValue('survey.survey_id');
			//var restriction = {'asc_uc_gen.survey_id': survey_id};
		var restriction = new Ab.view.Restriction();
		restriction.addClause('asc_uc_gen.survey_id', survey_id,'=');
		aucForm.refresh(restriction,true);
		aucForm.setFieldValue('asc_uc_gen.prefix','UC');
		aucForm.save();
		
		furnForm.setFieldValue('ta_audit.ta_id',aucForm.getFieldValue('asc_uc_gen.auc'));
		furnForm.save();
		}
	
	}
	else {
		// alert(furnForm.getFieldValue('ta_audit.ta_modular')+' '+furnForm.getFieldValue('ta_audit.ta_id'));
		furnForm.save();
					
		surveyGrid.refresh();
		surveyGrid.show(false);
		taAuditGrid.refresh();
		taAuditGrid.show(false);
		
	}
}

function modCheckSaveMod() {

	var furnForm = View.panels.get('taAuditDetailsFormMod');
	var taAuditGrid = View.panels.get('taAuditGrid');
	var surveyGrid = View.panels.get('surveyGrid');
	var aucForm = View.panels.get('ascAucGenerator_detailsPanel');
	var surveyDet = View.panels.get('surveyDet');
	
	if(!checkIfModularMod()){
		return false;
	}
	
	if (furnForm.getFieldValue('ta_audit.ta_modular')=='Yes' && furnForm.getFieldValue('ta_audit.ta_id')=='AUTOGENERATE') {
	//alert('true');
		if(furnForm.canSave()){
			var survey_id = surveyDet.getFieldValue('survey.survey_id');
			//var restriction = {'asc_uc_gen.survey_id': survey_id}; see below (test)
			//var restriction = ('asc_uc_gen.survey_id', survey_id);
		var restriction = new Ab.view.Restriction();
		restriction.addClause('asc_uc_gen.survey_id', survey_id,'=');
		aucForm.refresh(restriction,true);
		aucForm.setFieldValue('asc_uc_gen.prefix','UC');
		aucForm.save();
		
		furnForm.setFieldValue('ta_audit.ta_id',aucForm.getFieldValue('asc_uc_gen.auc'));
		
		// if (furnForm.getFieldValue('ta_audit.ta_id')=='AUTOGENERATE' || furnForm.getFieldValue('ta_audit.ta_id')=='' || aucForm.getFieldValue('asc_uc_gen.auc')=='' || !aucForm.save()) {
			// alert('Check if Unifying Code is Generated and click save...');
		// }
		if (furnForm.getFieldValue('ta_audit.ta_id')=='AUTOGENERATE' || furnForm.getFieldValue('ta_audit.ta_id')=='' || aucForm.getFieldValue('asc_uc_gen.auc')=='') {
			alert('Check if Unifying Code is Generated and click save...');
		}
		else {
		furnForm.save();
		}
		
		}
	
	}
	else {
		//alert(furnForm.getFieldValue('ta_audit.ta_modular')+' '+furnForm.getFieldValue('ta_audit.ta_id'));
		furnForm.save();
					
		surveyGrid.refresh();
		surveyGrid.show(false);
		taAuditGrid.refresh();
		taAuditGrid.show(false);
		
	}
}


function closeRoom(row) {
	var record = row.row.getRecord();
    var survey_id = record.getValue('ta_rm_audit.survey_id');
    var rm_id = record.getValue('ta_rm_audit.rm_id');
    var fl_id = record.getValue('ta_rm_audit.fl_id');
    var bl_id = record.getValue('ta_rm_audit.bl_id');
	var res = new Ab.view.Restriction();
	var ninjaForm = View.panels.get('ninjaForm');
	var surveyGrid = View.panels.get('surveyGrid');
	
	
	var txt;
	var r = confirm("Closing this survey room will prevent you from making adjustments to its surveyed furniture list. Confirm Close?");
		if (r == true) {
			var taRmForm = View.panels.get('ascphTaRmAudit_detailsPanel');
			var res = {'ta_rm_audit.survey_id': survey_id,'ta_rm_audit.rm_id':rm_id,'ta_rm_audit.fl_id':fl_id,'ta_rm_audit.bl_id':bl_id};
			taRmForm.refresh(res);
			taRmForm.show(false);
			taRmForm.setFieldValue('ta_rm_audit.status','Closed');
			taRmForm.save();
		} else {
			txt = "You pressed Cancel!";
		}
	
	var taRmGrid = View.panels.get('ascphTaRmAudit_treePanel');
	taRmGrid.refresh();
	View.panels.get('surveyDet').refresh();

}


function showRmDet() {
	//alert('hey');
	document.getElementById('back1').style.visibility = 'hidden';	
	document.getElementById('add').style.visibility = 'hidden';	
	document.getElementById('addM').style.visibility = 'hidden';	
	
}

function startRmDet() {
	//alert('hey');
	document.getElementById('back1').style.visibility = 'visible';	
	document.getElementById('add').style.visibility = 'visible';	
	document.getElementById('addM').style.visibility = 'visible';	
	
}

function checkOpenRm() {

	/*var record = row.row.getRecord();
    var openRm = record.getValue('survey.ta_rm_open');
    var rm_id = record.getValue('ta_rm_audit.rm_id');
    var fl_id = record.getValue('ta_rm_audit.fl_id');
    var bl_id = record.getValue('ta_rm_audit.bl_id');
	var res = new Ab.view.Restriction();
	var ninjaForm = View.panels.get('ninjaForm');
	var surveyGrid = View.panels.get('surveyGrid');
	*/
	
	var openRm = View.panels.get('surveyDet').getFieldValue('survey.ta_rm_open');
	
	if (openRm>0){
		//alert('hey');
		
		
		document.getElementById("ascphTaRmAudit_addNew").disabled = false;
	}
	else {
		
		document.getElementById("ascphTaRmAudit_addNew").disabled = false;
	}

}


function checkInvIfcomp() {
	//alert('checking');
	var taAddView = View.panels.get('taAuditDetailsForm');
	var taCompChecker = View.panels.get('ascTaTaCompUnion_form');
	var ta_id = taAddView.getFieldValue('ta_audit.ta_id');
	
	
	var res = new Ab.view.Restriction();
	
	var res = {'ta_components.ta_comp_id': ta_id};
	
	taCompChecker.refresh(res);
	taCompChecker.show(false);
	
	var resTa = taCompChecker.getFieldValue('ta_components.ta_id');
	
	if (resTa != '') {
		
		var resFnStd = taCompChecker.getFieldValue('ta_components.fn_std');
		var resModular = taCompChecker.getFieldValue('fnstd.modular');
		
		View.showMessage('Notice','<b>PCN</b>: <u><b>'+ta_id+'</b></u> is a <b>Component Property Control Number</b> existiting in the inventory <BR/> The <b>PCN</b>: <u><b>'+ta_id+'</b></u> will be replaced with Its <b>Unifying Code</b>: <u><b>'+resTa+'</b></u>.');
		
		
		
		taAddView.setFieldValue('ta_audit.ta_id',resTa);
		taAddView.setFieldValue('ta_audit.fn_std',resFnStd);
		taAddView.setFieldValue('ta_audit.ta_modular',resModular);
		
		
	}
	else {
		//alert('false');
		var resFnStd = taCompChecker.getFieldValue('ta_components.fn_std');
		var resModular = taCompChecker.getFieldValue('fnstd.modular');
		
		/*View.showMessage('Notice','<b>PCN</b>: <u><b>'+ta_id+'</b></u> is a <b>Component Property Control Number</b> existiting in the inventory <BR/> The <b>PCN</b>: <u><b>'+ta_id+'</b></u> will be replaced with Its <b>Unifying Code</b>: <u><b>'+resTa+'</b></u>.');*/
		
		
		
		//taAddView.setFieldValue('ta_audit.ta_id',resTa);
		taAddView.setFieldValue('ta_audit.fn_std',resFnStd);
		taAddView.setFieldValue('ta_audit.ta_modular',resModular);
		
	}
	
	
}

function checkIfModular(){
	var restriction = new Ab.view.Restriction();
	var fnstdDs = View.dataSources.get('fnstdDS');
	var panel = View.panels.get('taAuditDetailsForm');
	var fnstdField = panel.getFieldValue('ta_audit.fn_std');
	restriction.addClause('fnstd.fn_std', fnstdField.toUpperCase(), '=');
	var record = fnstdDs.getRecord(restriction);
	if(record.getValue('fnstd.modular') == 'Yes'){
		View.showMessage('Furniture Standard must not be modular.');
		return false;
	}
	
	return true;
}

function checkIfModularMod(){
	var restriction = new Ab.view.Restriction();
	var fnstdDs = View.dataSources.get('fnstdDS');
	var panel = View.panels.get('taAuditDetailsFormMod');
	var fnstdField = panel.getFieldValue('ta_audit.fn_std');
	restriction.addClause('fnstd.fn_std', fnstdField.toUpperCase(), '=');
	var record = fnstdDs.getRecord(restriction);
	if(record.getValue('fnstd.modular') == 'No'){
		View.showMessage('Furniture Standard must be modular.');
		return false;
	}
	
	return true;
}
