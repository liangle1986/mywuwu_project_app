<template>
    <section>
        <router-link v-if="!!path" :to="path">
            <span @click="changeActivePage">
                <van-icon :name="!isActived ? name.defaultName : name.activedName" style="width: 2rem; height:2rem;"/>
                <p :class="{active: isActived}">{{tagName}}</p>
            </span>
        </router-link>
        <div v-else class="headerIcon">
            <van-icon :name="name" style="width: 1.6rem; height:1.8rem"/>
        </div>
    </section>
</template>

<style src="./style.scss" lang="scss" scoped>
</style>
