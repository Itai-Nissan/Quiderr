<template>
  <section
    v-if="gig"
    class="preorder-container"
  >
    <div class="gig-details-wrapper">
      <div class="info-col">
        <header>
          <img :src="gig.imgUrl[0]">
          <div class="gig-info-wrapper">
            <h3>{{ gig.title }}</h3>
            <div
              v-if="gig"
              class="userStars"
            >
              <el-rate
                v-model="getOwnerRate"
                disabled
                show-score
                text-color="#ff9900"
              />
            </div>
          </div>
          <div class="price">
            ${{ Number.parseFloat(gig.price).toFixed(2) }}
          </div>
        </header>
        <section class="order-details">
          <h3 class="detail-title">
            Order Details
          </h3>
          <section>
            <div class="purchase-info">
              <div class="delivery-wrapper">
                <span
                  class="XQskgrQ delivery-icon"
                  aria-hidden="true"
                ><svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"
                  />
                  <path d="M9 4H7v5h5V7H9V4z" />
                </svg>
                </span>
                <b class="delivery">3 &nbsp;Days Delivery</b>
              </div>
              <div class="revisions-wrapper">
                <span
                  class="XQskgrQ revisions-icon"
                  aria-hidden="true"
                ><svg
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.50001 11.4999C6.40001 13.3999 9.60001 13.3999 11.5 11.4999C12.2 10.7999 12.7 9.7999 12.9 8.7999L14.9 9.0999C14.7 10.5999 14 11.8999 13 12.8999C10.3 15.5999 5.90001 15.5999 3.10001 12.8999L0.900012 15.0999L0.200012 8.6999L6.60001 9.3999L4.50001 11.4999Z"
                  />
                  <path
                    d="M15.8 7.2999L9.40001 6.5999L11.5 4.4999C9.60001 2.5999 6.40001 2.5999 4.50001 4.4999C3.80001 5.1999 3.30001 6.1999 3.10001 7.1999L1.10001 6.8999C1.30001 5.3999 2.00001 4.0999 3.00001 3.0999C4.40001 1.6999 6.10001 1.0999 7.90001 1.0999C9.70001 1.0999 11.5 1.7999 12.8 3.0999L15 0.899902L15.8 7.2999Z"
                  />
                </svg>
                </span>
                <b class="revisions">Unlimited Revisions</b>
              </div>
            </div>
            <div class="purchase-categories">
              <ul>
                <li
                  v-for="(tag, key) in gig.tags"
                  key="tag"
                >
                  <el-icon><Select /></el-icon>
                  <span>
                    {{ tag.charAt(0).toUpperCase() + tag.slice(1) }}
                  </span>
                </li>
              </ul>
            </div>
          </section>
        </section>
      </div>
      <div class="purchase-col">
        <section class="purchase-container">
          <div class="purchase-wrapper">
            <header class="purchase-title">
              <span class="txt">Summary</span>
            </header>
            <section class="purchase-box">
              <div class="summary-title">
                Total before tax
                <span>${{ Number.parseFloat(getTotalPrice).toFixed(2) }}</span>
              </div>
              <div class="summary-title">
                VAT
                <span>17%</span>
              </div>
              <div class="summary-title">
                Delivery time
                <span>15 days</span>
              </div>
              <div class="summary-total">
                Total
                <span>${{ Number.parseFloat(gig.price).toFixed(2) }}</span>
              </div>
            </section>
            <div>
              <button
                class="purchase-btn"
                :gig="gig"
                @click="onSetCreateOrder"
              >
                Purchase
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { socketService } from '../services/socket.service'

export default {
  name: 'OrderPage',
  data() {
    return {
      gig: null,
      gigId: this.$route.params.id,
      order: null,
      user: this.$store.getters.getUser,
      loggedInUser: null,
    }
  },
  computed: {
    orders() {
      return this.$store.getters.ordersToShow
    },
    getOwnerRate() {
      return Number.parseFloat(this.gig.owner.rate)
      // return Number.parseFloat(this.gig.owner.rate).toFixed(1)
    },
    getTotalPrice() {
      const vat = 17
      const vatPrice = (this.gig.price * 17) / 100
      return this.gig.price - vatPrice
    },
  },
  created() {
    this.getLoggedInUser()
    this.getGigById(this.gigId)
    this.$store.dispatch({ type: 'loadOrders' })

  },
  methods: {
    getLoggedInUser() {
      this.loggedInUser = this.$store.getters.getUser
    },
    async onSetCreateOrder() {
      if (!this.loggedInUser) {
        showErrorMsg('Please sign in')
        this.$router.push('/login')
        return
      }
      else await this.$store.dispatch({
        type: 'onCreateOrder',
        order: this.gig,
        user: this.user,
      })
      socketService.onSetOrderStatus("delete-order", this.gig._id)
      showSuccessMsg('Order added')
      this.$router.push(`/user-profile/${this.user._id}`)
    },
    async getGigById(gigId) {
      this.gig = await this.$store.dispatch({
        type: 'getGigById',
        gigId,
      })
    },
    onMoveToOrders() {
      this.$router.push(`/orders-list/${this.gigId}`)
    },
  },
}
</script>
