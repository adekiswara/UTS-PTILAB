var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    } else {
        alertbox('gagal', 'Data Tidak Boleh kosong')
    }
}

function readFormData() {
    var formData = {};
    formData["nim"] = document.getElementById("nim").value;
    formData["namalengkap"] = document.getElementById("namalengkap").value;
    formData["alamat"] = document.getElementById("alamat").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("listmahasiswa").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.nim;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.namalengkap;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.alamat;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = ` <button class="button4 fa fa-eraser" onClick="onDelete(this)"> Hapus</button>
                        <button class="button3 fa fa-pencil-square-o" onClick="onEdit(this)"> Ubah</button>`;
    alertbox('berhasil', 'Data Mahasiswa Baru Berhasil Ditambahkan')
}

function resetForm() {
    document.getElementById("nim").value = "";
    document.getElementById("namalengkap").value = "";
    document.getElementById("alamat").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("nim").value = selectedRow.cells[0].innerHTML;
    document.getElementById("namalengkap").value = selectedRow.cells[1].innerHTML;
    document.getElementById("alamat").value = selectedRow.cells[2].innerHTML; 
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.nim;
    selectedRow.cells[1].innerHTML = formData.namalengkap;
    selectedRow.cells[2].innerHTML = formData.alamat;
    alertbox('update', 'Data Mahasiswa Berhasil Diupdate')
}

function onDelete(td) {
    {
        row = td.parentElement.parentElement;
        document.getElementById("listmahasiswa").deleteRow(row.rowIndex);
        resetForm();
    }
    alertbox('hapus', 'Data Mahasiswa Baru Berhasil Dihapus')
}

function validate() {
    isValid = true;
    if (document.getElementById("namalengkap").value == "") {
        isValid = false;
        document.getElementById("namalengkapValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("namalengkapValidationError").classList.contains("hide"))
            document.getElementById("namalengkapValidationError").classList.add("hide");
    }
    return isValid;
}

function alertbox(tipe, pesan) {
    var alert = document.getElementById("snackbar");
    alert.className = "show berhasil";
    setTimeout(function(){ alert.className = alert.className.replace("show berhasil", ""); }, 3000);
    alert.innerHTML = pesan
}

function alertbox(tipe, pesan) {
    var alert = document.getElementById("snackbar");
    var temp;

    if (tipe == "berhasil") {
        alert.className = "show berhasil";
        temp = "show berhasil";
        alert.innerHTML = pesan;
    }
    else if(tipe == "hapus") {
        alert.className = "show hapus";
        temp = "show hapus";
        alert.innerHTML = pesan;
    }
    else if(tipe == "update") {
        alert.className = "show update";
        temp = "show update";
        alert.innerHTML = pesan;
    }
    else if(tipe == "gagal") {
        alert.className = "show gagal";
        temp = "show gagal";
        alert.innerHTML = pesan;
    }
    setTimeout(function(){ alert.className = alert.className.replace(temp, ""); }, 3000);
}