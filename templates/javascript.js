


document.getElementById('addCard').addEventListener("click", function(){

  var para = document.createElement("p");
  var node = document.createTextNode("This is new.");
  para.appendChild(node);

  var element = document.getElementById("div1");
  var child = document.getElementById("p1");
  element.insertBefore(para, child);

});

// template

<div style="display: none" data-type="template" data-section="movies" data-movie_id="myid" id="movie-id" class="movie anotherclass">
        <img src="myImageUrl">
        <div class="aCSSclass">
            <div class="aCSSclass">
                <div class="aCSSclass"></div>
                <div class="aCSSclass">
                    <div class="aCSSclass title">
                        Movie title
                    </div>

                    <div class="details form-group">
                        <a class="aCSSclass" href="myHref">Details</a>
                        <button onclick="SomeFunction" class="aCSSclass">My button</button>
                        <div class="aCSSclass"><span class="icon star"></span><span class="aCSSclass"></span><span class="aCSSclass"></span><span class="aCSSclass"></span><span class="aCSSclass"></span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="card">
      <div class="card-header" role="tab" id="headingOne">
        <h5 class="mb-0">
      <a>
        Default Name
      </a>
      <span class="money-owed">Money Owed: $</span>
      <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <i class="fa fa-chevron-down" aria-hidden="true"></i>
      </a>
    </h5>
      </div>

      <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne">
        <div class="card-block">
          <ul>
            <li>
              <span>January 3rd, 2017 Default Date</span>
              <span class="money-owed-list">$500 Default</span>
            </li>
          </ul>
          <hr>
        </div>
      </div>
    </div>
