<script lang="ts">
    import { user } from "$lib/firebase";
</script>

{#if $user}
    <slot />
{:else}
    <p class="text-error">
        Signed in please please 🤬
        <a class="btn btn-primary" href="/login">Sign in</a>
    </p>
{/if}
