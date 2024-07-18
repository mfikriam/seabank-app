/* eslint-disable */
import '@babel/polyfill';
import { DataTable } from 'simple-datatables';

import { showAlert } from './alert';
import { addNewData, updateDataById, delDataById } from './manage-data';
import { classification } from './naive-bayes';

//? DOM Element - Halaman Distribusi
const distribusiTable = document.querySelector('#distribusi-table');
const addDistribusiForm = document.querySelector('#form-add-distribusi');
const updateDistribusiBtns = document.querySelectorAll('.btn-update-distribusi');
const deleteDistribusiBtns = document.querySelectorAll('.btn-delete-distribusi');

//? DOM Element - Halaman Review
const reviewTable = document.querySelector('#review-table');
const addReviewForm = document.querySelector('#form-add-review');
const deleteReviewBtns = document.querySelectorAll('.btn-delete-review');

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

//***************** Halaman Review ********************/
//? Datatables Review
if (reviewTable) {
  const options = {
    perPage: 10,
    columns: [{ select: 3, sortable: false }],
  };
  new DataTable(reviewTable, options);
}

//? Add Data Review
if (addReviewForm) {
  const addReviewModal = document.querySelector('#modal-add-review');
  const bsAddReviewModal = new bootstrap.Modal(addReviewModal);

  addReviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addReviewForm.classList.add('was-validated');

    if (addReviewForm.checkValidity()) {
      const reviewObj = {
        teks_review: addReviewForm.querySelector('#add-teks_review').value,
      };

      //? Get Data Distribusi
      const distribusiObjArr = JSON.parse(document.querySelector('#title-review').dataset.distribusiObjArr);

      //? Naive Bayes
      reviewObj['sentimen'] = classification(distribusiObjArr, reviewObj.teks_review);

      // console.log('Sentimen result:', reviewObj['sentimen']);

      addNewData('review', reviewObj, addReviewForm, bsAddReviewModal);
    }
  });
}

//? Delete Data Review
if (deleteReviewBtns.length > 0) {
  const deleteReviewModalList = document.querySelectorAll('[id^="modal-delete-review"]');
  const bsDeleteReviewModalList = Array.from(deleteReviewModalList).map((el) => new bootstrap.Modal(el));

  deleteReviewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const reviewId = btn.dataset.objId;
      delDataById('review', reviewId, bsDeleteReviewModalList);
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
