<template>
    <div>
        <h1>Register</h1>
        <input type="email" placeholder="email" v-model="email"><br>
        <input type="password" placeholder="Password" v-model="password"><br>
        <button>Submit</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    }
}
</script>

<style>

</style>