jQuery(document).ready(function () {
  jQuery('.DeleteOperation').click(function (event) {
    event.preventDefault(); // Prevent the default anchor behavior
    var url = jQuery(this).attr('href');
    if (confirm('Do you want to continue?')) {
      //alert('You selected Yes. URL: ' + url);
      // Redirect to the URL
      window.location.href = url;
    } else {
      alert('You selected No.');
    }
  });


  // Category Delete Operation 


  jQuery('.DeleteOperationCategory').click(function (event) {
    event.preventDefault(); // Prevent the default anchor behavior
    var url = jQuery(this).attr('href');
    if (confirm('Do you want to continue?')) {
      //  alert('You selected Yes. URL: ' + url);
      // Redirect to the URL
      window.location.href = url;
    } else {
      alert('You selected No.');
    }
  });

});



// Jquery add button 


jQuery(document).ready(function () {
  let fileInputCount = 0;

  jQuery('#add-file-button').click(function (e) {
    e.preventDefault();
    fileInputCount++;
    const fileInputHtml = `
   
    <div class="row mt-3" id="file-input-${fileInputCount}">
     <div class="col-8">
                             <input type="file" name="profilePic" id="file${fileInputCount}" class="form-control">
                             </div>
                             <div class="col-4">
                             <a  href="#" class="remove-file-button form-control" data-id="${fileInputCount}">Remove</a>
                             </div>
                           </div>`;
    jQuery('#file-input-container').append(fileInputHtml);
  });

  // Event delegation to handle dynamic elements
  jQuery('#file-input-container').on('click', '.remove-file-button', function () {
    const id = jQuery(this).data('id');
    jQuery(`#file-input-${id}`).remove();
  });
});

// Jquery add button End

// Jquery Ajax call

jQuery(document).ready(function () {
  //  jQuery('#fileForm_0').on('submit', uploadFile);


  // Jquery Ajax Call End

})

function UploadMainImageJS(e, form) {
  // var formData = new FormData();
  //formData.append('file', $('#ProductImages')[0].files[0]);
  //alert("hello");
  e.preventDefault();

  var formData = new FormData(form);
  var url = jQuery('#url').val();
  console.log(url);
  // Log each field's key and value
  // for (var [key, value] of formData.entries()) {
  //   console.log(key, value);
  // }

  //alert("Now the form Data", formData);
  jQuery.ajax({
    //url: 'http://localhost:5000/products/UpdateProductMainImage',
    url: url,
    type: 'POST',
    data: formData,
    processData: false, // Prevent jQuery from automatically transforming the data into a query string
    contentType: false, // Prevent jQuery from setting the Content-Type header
    beforeSend: function () {
      //jQuery('.loadingmain').html('Loading...');
      jQuery('.spinner-border').show();
    },
    success: function (response) {
      //alert('File uploaded successfully Main Image!');

      // Remove the old image link
      //jQuery('.loadingmain').html('');
      jQuery('.spinner-border').hide();

      jQuery('#main_image_scr').attr('src', '');

      // Add the new image link
      jQuery('#main_image_scr').attr('src', response.url);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert('File upload failed!');
    }
  });
}


function UploadSubImagesJS(e, form) {
  // var formData = new FormData();
  //formData.append('file', $('#ProductImages')[0].files[0]);
  //alert("hello");
  e.preventDefault();

  var formData = new FormData(form);
  // Get the value of ImageIndex
  var index = formData.get('ImageIndex');
  var url = formData.get('url');
  console.log("ImageIndex value:", index);

  //console.log("index ID:", formData[0]);
  //alert("Now the form Data", formData);
  jQuery.ajax({
    //url: 'http://localhost:5000/products/UpdateProductSubImage',
    url: url,
    type: 'POST',
    data: formData,
    processData: false, // Prevent jQuery from automatically transforming the data into a query string
    contentType: false, // Prevent jQuery from setting the Content-Type header
    beforeSend: function () {
      // jQuery('.loading').html('Loading...');
      jQuery('.spinner-border-main_' + index).show();
    },
    success: function (response) {
      //jQuery('.loading').html('');
      jQuery('.spinner-border-main_' + index).hide();
      // Remove the old image link
      jQuery('#image_link_' + response.index).attr('src', '');

      // Add the new image link
      jQuery('#image_link_' + response.index).attr('src', response.url);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert('File upload failed!');
    }
  });
}




