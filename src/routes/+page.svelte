<script>
    import { userData } from "$lib/firebase";
</script>

<svelte:head>
    <title>portolink</title>
    <meta
        name="description"
        content="Demo project for the Full SvelteKit Course by Fireship"
    />
</svelte:head>

<main class="flex w-full min-h-screen">
    <div class="hero bg-base-200">
        <div class="hero-content text-center">
            <div class="w-full">
                <h1 class="text-7xl font-bold">Michael Lim</h1>
                <p class="py-6 text-2xl">Link to my developer portfolio</p>
                {#if $userData?.username}
                    <a href="/{$userData.username}/edit" class="btn btn-primary"
                        >Edit Profile</a
                    >
                {:else}
                    <!--      <a href="/login" class="btn btn-primary">Get Started</a>-->
                    <a href="/savon940" class="btn btn-primary">My Profile</a>
                {/if}
                <p class="py-6">
                    Click here to create your own profile
                    <a href="/login" class="btn btn-outline btn-primary"
                        >Get Started</a
                    >
                </p>
            </div>
        </div>
    </div>
</main>
