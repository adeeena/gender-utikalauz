import {renderEntryDocument} from '@components/entry/entry';

describe('renderEntryDocument', () => {
  it('waits for markdown rendering and keeps the complete article body', async () => {
    const raw = [
      '---',
      'title: "Masztektómia"',
      'description: "Mellkasi műtétről: rövid összefoglaló."',
      '---',
      '# Masztektómia',
      '',
      '---',
      '',
      '[Tovább](https://example.org)'
    ].join('\n');

    const document = await renderEntryDocument(raw, async (markdown) => {
      await Promise.resolve();
      expect(markdown).toContain('\n---\n');
      return `<article>${markdown.replace(
        '[Tovább](https://example.org)',
        '<a href="https://example.org">Tovább</a>'
      )}</article>`;
    });

    expect(document.title).toBe('Masztektómia');
    expect(document.description).toContain('összefoglaló.');
    expect(document.html).toContain('# Masztektómia');
    expect(document.html).toContain('\n---\n');
    expect(document.html).toContain('target="_blank"');
  });
});
