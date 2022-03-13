<template>
    <button @click="test">abc</button>
<!-- {/* <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-Target" />
                    </svg> */} -->
</template>

<script setup>
const CallApp = require('callapp-lib');
const options = {
    key1: '',
    key2: ''
}
const callLib = new CallApp(options)
callLib.open({
    param: {},
    path: ''
})
const test = () => {

}
</script>

