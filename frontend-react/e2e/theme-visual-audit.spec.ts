import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Varredura Visual e Auditoria de Tema (Dark vs Light Mode)', () => {
  test('audita contraste e classes fixas residuais no Light Mode', async ({ page }) => {
    // 1. Acessa a Home
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 2. Garante que o alternador de tema está presente
    const toggleBtn = page.locator('[data-testid="theme-toggle-btn"]').first();
    await expect(toggleBtn).toBeVisible();

    // 3. Garante estado inicial (Dark)
    const isDarkInitial = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    if (!isDarkInitial) {
      await toggleBtn.click();
      await page.waitForTimeout(300);
    }

    // 4. Alterna para Light Mode
    await toggleBtn.click();
    await page.waitForTimeout(400);

    const isLightActive = await page.evaluate(() => document.documentElement.classList.contains('light'));
    expect(isLightActive).toBe(true);

    // 5. Varredura de elementos com resíduo de classes escuras hardcoded no Light Mode
    const auditReport = await page.evaluate(() => {
      // Cores escuras que não deveriam estar visíveis como fundo de seções/cards no Light Mode
      const darkBgColors = [
        'rgb(40, 42, 54)', // #282a36 (Dracula BG)
        'rgb(30, 31, 41)', // #1e1f29 (Dracula Darker)
        'rgb(68, 71, 90)', // #44475a (Dracula Current Line)
      ];

      // Cores claras de texto que não deveriam estar em fundos claros
      const lightTextColors = [
        'rgb(248, 248, 242)', // #f8f8f2 (Dracula FG)
        'rgba(248, 248, 242, 0.7)',
        'rgba(248, 248, 242, 0.8)',
      ];

      const elements = Array.from(document.querySelectorAll('section, header, footer, div, card, article, main'));
      const offendingDarkBgs: Array<{ tag: string; id: string; className: string; bg: string; textSample: string }> = [];
      const offendingLightTexts: Array<{ tag: string; className: string; color: string; textSample: string }> = [];

      elements.forEach((el) => {
        const style = window.getComputedStyle(el);
        const bg = style.backgroundColor;
        const color = style.color;
        const text = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40);

        if (darkBgColors.includes(bg)) {
          offendingDarkBgs.push({
            tag: el.tagName.toLowerCase(),
            id: el.id || '',
            className: el.className.toString().slice(0, 80),
            bg,
            textSample: text,
          });
        }

        // Verifica texto claro em elementos de texto diretos
        if (el.children.length === 0 && text.length > 0 && lightTextColors.some((c) => color.includes(c))) {
          offendingLightTexts.push({
            tag: el.tagName.toLowerCase(),
            className: el.className.toString().slice(0, 80),
            color,
            textSample: text,
          });
        }
      });

      return {
        totalElementsScanned: elements.length,
        offendingDarkBgsCount: offendingDarkBgs.length,
        offendingLightTextsCount: offendingLightTexts.length,
        sampleDarkBgs: offendingDarkBgs.slice(0, 15),
        sampleLightTexts: offendingLightTexts.slice(0, 15),
      };
    });

    // Salva o relatório de auditoria para leitura
    const reportDir = path.resolve('test-results');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(reportDir, 'theme-audit-report.json'),
      JSON.stringify(auditReport, null, 2),
      'utf-8'
    );

    console.log('=== RELATÓRIO DE VARREDURA VISUAL (LIGHT MODE) ===');
    console.log(`Total de elementos inspecionados: ${auditReport.totalElementsScanned}`);
    console.log(`Elementos com fundo escuro hardcoded (#282a36, #1e1f29, #44475a): ${auditReport.offendingDarkBgsCount}`);
    console.log(`Elementos com texto claro hardcoded (#f8f8f2): ${auditReport.offendingLightTextsCount}`);
  });
});
