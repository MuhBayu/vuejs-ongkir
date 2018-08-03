<template>
  <div class="container">
    <h1 class="text-center">{{ msg }}</h1>
    <div class="form-group">
      <label><strong>Kota Asal</strong></label>
      <select v-model="kota_asal" class="form-control">
      <template>
        <option v-for="city in citys" :key="city.city_id" v-bind:value="city.city_id">{{ city.city_name }}</option>
      </template>
      </select>
    </div>
    <div class="form-group">
      <label><strong>Kota Tujuan</strong></label>
      <select v-model="kota_tujuan" class="form-control">
        <option v-for="city in citys" :key="city.city_id" v-bind:value="city.city_id">{{ city.city_name }}</option>
      </select>
    </div>
    <div class="form-group">
      <label><strong>Berat <small>(gr)</small></strong></label>
      <input type="number" v-model="berat" class="form-control"/>
    </div>
    <div class="form-group">
      <label><strong>Kurir</strong></label>
      <select v-model="kurir" class="form-control">
        <option>jne</option>
        <option>pos</option>
        <option>tiki</option>
      </select>
    </div>
    <div class="form-group">
      <button @click="getCostCity" class="btn btn-primary">Hitung</button>
    </div>
    <template v-if="cost_results !== null">
      <h3>Daftar Harga</h3>
      <table class="table table-bordered">
        <tr>
          <th>Layanan</th>
          <th>Deskripsi</th>
          <th>Tarif</th>
          <th>Estimasi</th>
        </tr>
        <tr v-for="biaya in cost_results" :key="biaya.service">
          <td>{{ biaya.service }}</td>
          <td>{{ biaya.description }}</td>
          <template v-for='cost in biaya.cost'>
            <td :key="cost.value">Rp. {{ cost.value }}</td>
            <td :key="cost.etd">{{ cost.etd }} hari</td>
          </template>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import RoService from '@/services/RoService'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Cek Ongkir',
      cost_results: null,
      kota_asal: '',
      kota_tujuan: '',
      citys: [],
      berat: 1,
      kurir: 'jne'
    }
  },
  mounted () {
    RoService.getCity().then(response => {
      this.citys = response.data.rajaongkir.results
    })
  },
  methods: {
    async getCostCity () {
      await RoService.getCost({
        'origin': this.kota_asal,
        'destination': this.kota_tujuan,
        'weight': this.berat,
        'courier': this.kurir
      }).then(response => {
        this.cost_results = response.data.rajaongkir.results[0].costs
      })
    }
  }
}
</script>
