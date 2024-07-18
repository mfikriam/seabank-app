/* eslint-disable */
import '@babel/polyfill';
import { DataTable } from 'simple-datatables';

import { showAlert } from './alert';
import { addNewData, updateDataById, delDataById } from './manage-data';
import { classification } from './svm';

//? DOM Element - Halaman Distribusi
const distribusiTable = document.querySelector('#distribusi-table');
const addDistribusiForm = document.querySelector('#form-add-distribusi');
const updateDistribusiBtns = document.querySelectorAll('.btn-update-distribusi');
const deleteDistribusiBtns = document.querySelectorAll('.btn-delete-distribusi');

//? DOM Element - Halaman Nasabah Baru
const nasabahBaruTable = document.querySelector('#nasabah-baru-table');
const addNasabahBaruForm = document.querySelector('#form-add-nasabah-baru');
const updateNasabahBaruBtns = document.querySelectorAll('.btn-update-nasabah-baru');
const deleteNasabahBaruBtns = document.querySelectorAll('.btn-delete-nasabah-baru');

//***************** Halaman Distribusi Kata ********************/
//? Datatables Distribusi
if (distribusiTable) {
  const options = {
    perPage: 10,
    columns: [{ select: 4, sortable: false }],
  };
  new DataTable(distribusiTable, options);
}

//? Add Data Distribusi
if (addDistribusiForm) {
  const addDistribusiModal = document.querySelector('#modal-add-distribusi');
  const bsAddDistribusiModal = new bootstrap.Modal(addDistribusiModal);

  addDistribusiForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addDistribusiForm.classList.add('was-validated');

    if (addDistribusiForm.checkValidity()) {
      const distribusiObj = {
        kata: addDistribusiForm.querySelector('#add-kata').value,
        negatif: addDistribusiForm.querySelector('#add-negatif').value,
        positif: addDistribusiForm.querySelector('#add-positif').value,
      };

      addNewData('distribusi', distribusiObj, addDistribusiForm, bsAddDistribusiModal);
    }
  });
}

//? Update Distribusi
if (updateDistribusiBtns.length > 0) {
  const updateDistribusiModalList = document.querySelectorAll('[id^="modal-update-distribusi"]');
  const bsUpdateDistribusiModalList = Array.from(updateDistribusiModalList).map((el) => new bootstrap.Modal(el));
  const updateDataFormList = document.querySelectorAll(`[id^="form-update-distribusi"]`);

  updateDataFormList.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('was-validated');
      const distribusiId = form.dataset.objId;

      if (form.checkValidity()) {
        const distribusiObj = {
          kata: form.querySelector('#update-kata').value,
          negatif: form.querySelector('#update-negatif').value,
          positif: form.querySelector('#update-positif').value,
        };
        updateDataById('distribusi', distribusiId, distribusiObj, form, bsUpdateDistribusiModalList);
      }
    });
  });
}

//? Delete Distribusi
if (deleteDistribusiBtns.length > 0) {
  const deleteDistribusiModalList = document.querySelectorAll('[id^="modal-delete-distribusi"]');
  const bsDeleteDistribusiModalList = Array.from(deleteDistribusiModalList).map((el) => new bootstrap.Modal(el));

  deleteDistribusiBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const distribusiId = btn.dataset.objId;
      delDataById('distribusi', distribusiId, bsDeleteDistribusiModalList);
    });
  });
}

//***************** Halaman Nasabah Baru ********************/
let dataTrain = [];
let dataTest = [];

//? Datatables Nasabah Baru
if (nasabahBaruTable) {
  const options = {
    perPage: 10,
    columns: [{ select: 8, sortable: false }],
  };
  new DataTable(nasabahBaruTable, options);

  //? Get Data Nasabah Lama
  const nasabahLamaObjArr = JSON.parse(document.querySelector('#title-nasabah-baru').dataset.nasabahLamaObjArr);

  //? Split Dataset Nasabah Lama
  const splitIndex = Math.floor(nasabahLamaObjArr.length * 0.7);
  dataTrain = nasabahLamaObjArr.slice(0, splitIndex);
  dataTest = nasabahLamaObjArr.slice(splitIndex);
}

//? Add Data Nasabah Baru
if (addNasabahBaruForm) {
  const addNasabahBaruModal = document.querySelector('#modal-add-nasabah-baru');
  const bsAddNasabahBaruModal = new bootstrap.Modal(addNasabahBaruModal);

  addNasabahBaruForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addNasabahBaruForm.classList.add('was-validated');

    if (addNasabahBaruForm.checkValidity()) {
      const nasabahBaruObj = {
        nama: addNasabahBaruForm.querySelector('#add-nama').value,
        usia: addNasabahBaruForm.querySelector('#add-usia').value,
        pendapatan: addNasabahBaruForm.querySelector('#add-pendapatan').value / 1000000,
        utang: addNasabahBaruForm.querySelector('#add-utang').value / 1000000,
        riwayat_pembayaran: addNasabahBaruForm.querySelector('#add-riwayat_pembayaran').value,
      };

      //? SVM
      const { prediksi_potensial, akurasi } = classification(dataTrain, dataTest, nasabahBaruObj);
      nasabahBaruObj['prediksi_potensial'] = prediksi_potensial;
      nasabahBaruObj['akurasi'] = akurasi;

      addNewData('nasabah-baru', nasabahBaruObj, addNasabahBaruForm, bsAddNasabahBaruModal);
    }
  });
}

//? Update Data Nasabah Baru
if (updateNasabahBaruBtns.length > 0) {
  const updateNasabahBaruModalList = document.querySelectorAll('[id^="modal-update-nasabah-baru"]');
  const bsUpdateNasabahBaruModalList = Array.from(updateNasabahBaruModalList).map((el) => new bootstrap.Modal(el));
  const updateDataFormList = document.querySelectorAll(`[id^="form-update-nasabah-baru"]`);

  updateDataFormList.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('was-validated');
      const nasabahBaruId = form.dataset.objId;

      if (form.checkValidity()) {
        const nasabahBaruObj = {
          nama: form.querySelector('#update-nama').value,
          usia: form.querySelector('#update-usia').value,
          pendapatan: form.querySelector('#update-pendapatan').value / 1000000,
          utang: form.querySelector('#update-utang').value / 1000000,
          riwayat_pembayaran: form.querySelector('#update-riwayat_pembayaran').value,
        };

        //? SVM
        const { prediksi_potensial, akurasi } = classification(dataTrain, dataTest, nasabahBaruObj);

        nasabahBaruObj['prediksi_potensial'] = prediksi_potensial;
        nasabahBaruObj['akurasi'] = akurasi;

        updateDataById('nasabah-baru', nasabahBaruId, nasabahBaruObj, form, bsUpdateNasabahBaruModalList);
      }
    });
  });
}

//? Delete Data Nasabah Baru
if (deleteNasabahBaruBtns.length > 0) {
  const deleteNasabahBaruModalList = document.querySelectorAll('[id^="modal-delete-nasabah-baru"]');
  const bsDeleteNasabahBaruModalList = Array.from(deleteNasabahBaruModalList).map((el) => new bootstrap.Modal(el));

  deleteNasabahBaruBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const nasabahBaruId = btn.dataset.objId;
      delDataById('nasabah-baru', nasabahBaruId, bsDeleteNasabahBaruModalList);
    });
  });
}

//************************** ALERT ********************************** */
const delayAlertMsg = sessionStorage.getItem('delay-alert-message');
const delayAlertType = sessionStorage.getItem('delay-alert-type');
if (delayAlertMsg) {
  showAlert(delayAlertMsg, delayAlertType);
  sessionStorage.removeItem('delay-alert-message');
  sessionStorage.removeItem('delay-alert-type');
}
