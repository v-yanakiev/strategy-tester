<script setup lang="ts">
import { KeepAlive } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <div class="app-container">
        <header>
            <div class="wrapper">
                <nav>
                    <RouterLink to="/" v-test-id="'homeLink'">Home</RouterLink>
                    <RouterLink to="dataInput" v-test-id="'dataInputLink'"
                        >Зареждане на данни</RouterLink
                    >
                    <RouterLink to="graphEditor" v-test-id="'graphEditorLink'"
                        >Създаване на граф</RouterLink
                    >
                    <RouterLink
                        to="runSimulation"
                        v-test-id="'runSimulationLink'"
                        >Пускане на симулация</RouterLink
                    >
                </nav>
            </div>
        </header>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>

<style scoped>
.app-container {
    display: flex;
    flex-direction: column;
}

header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    display: flex;
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}
</style>
