(function(){
    const CLASS = 'dark';
    const KEY = 'aura_theme';

    function isDark(){ return document.documentElement.classList.contains(CLASS); }
    function applyTheme(value){
        if(value === 'dark') document.documentElement.classList.add(CLASS);
        else document.documentElement.classList.remove(CLASS);
    }

    function toggleTheme(){
        const next = isDark() ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem(KEY, next); } catch(e){}
        updateButtons();
    }

    function updateButtons(){
        const dark = isDark();
        document.querySelectorAll('.theme-toggle').forEach(btn => {
            btn.innerHTML = dark ? '<span class="material-symbols-outlined">light_mode</span>' : '<span class="material-symbols-outlined">dark_mode</span>';
            btn.setAttribute('aria-pressed', dark);
            btn.title = dark ? 'Modo claro' : 'Modo escuro';
        });
    }

    document.addEventListener('DOMContentLoaded', ()=>{
        try {
            const saved = localStorage.getItem(KEY);
            if(saved) applyTheme(saved);
        } catch(e){}

        updateButtons();

        document.addEventListener('click', (e)=>{
            const btn = e.target.closest && e.target.closest('.theme-toggle');
            if(btn) { e.preventDefault(); toggleTheme(); }
        });

        // small animated feedback on toggle buttons
        function flashToggle(buttons, duration = 300) {
            buttons.forEach(b => {
                b.classList.add('active');
                setTimeout(() => b.classList.remove('active'), duration);
            });
        }

        // enhance updateButtons to animate
        const originalUpdate = updateButtons;
        updateButtons = function(){
            originalUpdate();
            const buttons = document.querySelectorAll('.theme-toggle');
            flashToggle(Array.from(buttons));
        }

        // expose for console if needed
        window.AuraTheme = { toggle: toggleTheme, isDark: isDark };
    });
})();
