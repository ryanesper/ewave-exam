function loadCarousel() {
  $('.carousel').owlCarousel({
    center: true,
    loop:true,
    margin:1,
    dots: true,
    nav: true,
    slideTransition: 'linear',
    responsive:{
      1:{
        items: 1
      },
      460:{
        items: 2
      },
    },
    autoplay:true,
    autoplayTimeout:3000,
    // autoplayHoverPause:true
  })
}

async function loadCarouselInitialCats() {
  let catUrls = [];
  catUrls = await axios.get('https://api.thecatapi.com/v1/images/search?limit=3', catsapiconfig)
  catUrls = catUrls.data.map(i => i.url)

  $.each(catUrls, function(k, url) {
    $('.carousel').trigger('add.owl.carousel', [`
      <div class="carousel__box">
        <img src="${url}" alt="">
      </div>
    `]).trigger('refresh.owl.carousel');
  })
}

function getDailyTopCats() {
  axios.get('https://api.thecatapi.com/v1/images/search?limit=4&size=med', catsapiconfig).then(res => {
    let topCats = res.data.map(i => i.url)

    $.each(topCats, function(k, v) {
      $(`.top-cats img:eq(${k})`).prop('src', v)
    })
  })


}

function addCarouselItem() {
  axios.get('https://api.thecatapi.com/v1/images/search?limit=1', catsapiconfig).then(res => {
    $('.carousel').trigger('add.owl.carousel', [`
      <div class="carousel__box">
        <img src="${res.data[0].url}" alt="">
      </div>
    `]).trigger('refresh.owl.carousel');
  })
}

function getRandomFact() {
  axios.get('https://cat-fact.herokuapp.com/facts/random').then(res => {
    $(".facts-text").text(res.data.text)
  })
}