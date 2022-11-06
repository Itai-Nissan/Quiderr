<template>
  <section class="home-body">
    <div class="home-hero" :class="{bc_andrea:imgIdx===0,bc_ritica:imgIdx===1,bc_zach:imgIdx===2,bc_gabrielle:imgIdx===3,bc_moon:imgIdx===4}">

      <div class="heros">
        <div class="andrea" :class="{visible:imgIdx===0}"></div>
        <div class="ritika" :class="{visible:imgIdx===1}"></div>
        <div class="zach" :class="{visible:imgIdx===2}"></div>
        <div class="gabrielle" :class="{visible:imgIdx===3}"></div>
        <div class="moon" :class="{visible:imgIdx===4}"></div> 
      </div>

      <div class="home-text-and-input">
        <h1 class="home-hero-text">Find the perfect <span class="fancy-text">freelance</span> services for your business</h1>
        <span class="home-filter-container">
          <img class="search-image" src="../assets/imgs/icons8-search-30.png" alt="search">
          <input v-model="searchInput" class="home-search" type="search" :placeholder="placeholder">
          <button class="home-search-btn" @click="search()">Search</button>
        </span> 
        <div class="popular-tags">Popular:
          <div @click="search('website design')" class="home-popular-btn">Website Design</div>
          <div @click="search('wordpress')" class="home-popular-btn">WordPress</div>
          <div @click="search('logo design')" class="home-popular-btn">Logo Design</div>
          <div @click="search('nft art')" class="home-popular-btn">NFT Art</div>
        </div>

        <div class="creator-name">
          <div :class="{visible:imgIdx===0}">Andrea, <span>Fashion Designer</span></div>
          <div :class="{visible:imgIdx===1}">Ritika, <span>Shoemaker and Designer</span></div>
          <div :class="{visible:imgIdx===2}">Zach, <span>Bar Owner</span></div>
          <div :class="{visible:imgIdx===3}">Gabrielle, <span>Video Editor</span></div>
          <div :class="{visible:imgIdx===4}">Moon, <span>Marketing Expert</span></div>
        </div>
      </div>
    </div>

    <div class="trusted-by">
      <div>
        Trusted by:
        <picture><source media="(max-width: 899px)" srcset="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook.543cf10.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.2eb3efa.png 2x"><source media="(min-width: 900px)" srcset="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook.31d5f92.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png 2x"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook.31d5f92.png" alt="facebook"></picture>
        <picture><source media="(max-width: 899px)" srcset="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google.aaaa0ad.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.b5c24c4.png 2x"><source media="(min-width: 900px)" srcset="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google.517da09.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png 2x"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google.517da09.png" alt="Google"></picture>
        <picture><source media="(max-width: 899px)" srcset="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix.3cb353a.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.02746a2.png 2x"><source media="(min-width: 900px)" srcset="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix.e3ad953.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png 2x"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix.e3ad953.png" alt="NETFLIX"></picture>
        <picture><source media="(max-width: 899px)" srcset="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg.128c0d9.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.259884d.png 2x"><source media="(min-width: 900px)" srcset="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg.8b7310b.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.6dc32e4.png 2x"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg.8b7310b.png" alt="P&amp;G"></picture>
        <picture><source media="(max-width: 899px)" srcset="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal.9e4defc.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.e48e2b0.png 2x"><source media="(min-width: 900px)" srcset="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal.ec56157.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png 2x"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal.ec56157.png" alt="PayPal"></picture>       
        </div>
    </div>


    <div class="categories-list">
      <!-- <home-carousel-cmp></home-carousel-cmp> -->
    </div>

    <about-cmp></about-cmp>

  </section>
</template>

<script>
import AboutCmp from '../components/home-page/about.cmp.vue';
import homeCarouselCmp from '../components/home-page/home-carousel.cmp.vue';

export default {
  name: 'home',

  components: {AboutCmp , homeCarouselCmp},

  data() {
    return {
      placeholder: `Try "designing logo"`,
      searchInput: null,
      imgIdx: 0,
      imgInterval: null,

    };
  },
  created() { 
    this.imgInterval = setInterval(()=>{
      if(this.imgIdx === 4) this.imgIdx = -1
      this.imgIdx++
    },5000)
  },
  methods: {
    search(search = this.searchInput){
      this.$router.push(`/explore?search=${search}`)
    },
  },
  computed: {},
  unmounted() {
    clearInterval(this.imgInterval)
  },
};

</script>

