// Released under the MIT license
// created by: Frank Zondlo
// Quick and dirty jquery script to split ULs into multiple columns

(function($){

  jQuery.fn.cols = function(num_columns) {

    //Break up the array into managable chunks
    function chunk (arr, number_of_chunks) {

     var chunks = [],
         i = 0,
         n = arr.length;

     closest_divisible_num = n
     while (closest_divisible_num % 2 != 0) {
       closest_divisible_num++
     }

     chunk_size = closest_divisible_num / number_of_chunks

     while (i < n) {
       chunks.push(arr.slice(i, i += chunk_size));
     }

     return chunks;
    }

    // Turns an array list of UL elements into html
    function createHTML(list){
       html = '';
       for (var i = 0; i < list.length; i++) {
           html += '<li>' + list[i] + '</li>'
       };
       return html
    }

    //Iterate through each match and apply
    $(this).each(function () {

      //Get the current class, so we can add it
      //to the new ULs we will create.
      cur_class = $(this).attr('class')
      if (cur_class == undefined) {
        cur_class = ""
      } else {
        cur_class = "class='" + cur_class + "' "
      }

      //Create array of all posts in lists
      var li_arr = new Array();
      $(this).find('li').each(function(){
         li_arr.push($(this).html());
      })

      //add the HTML back to the dom tree
      array_chunks = chunk(li_arr, num_columns);
      new_html = ""  //html(createHTML(array_chunks[0]));
      for (i = 0; i < num_columns ;i++) {
       new_html = new_html + '<ul ' + cur_class + '>' + createHTML(array_chunks[i]) + '</ul>';
      }
      $(this).replaceWith(new_html)
    });

  };
})(jQuery);
