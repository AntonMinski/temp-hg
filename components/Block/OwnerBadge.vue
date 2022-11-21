<template>
  <UIBadge outline>
    <template #icon>
      <UIIcon icon="icon-eye-open-f mr-[5px]" />
    </template>
    Public
  </UIBadge>

  <UIBadge type="danger" outline>
    <template #icon>
      <UIIcon icon="icon-eye-close-f mr-[5px]" />
    </template>
    Private
  </UIBadge>

  <UIBadge type="gray">
    <template #icon>
      <UIIcon icon="icon-draft mr-[5px]" />
    </template>
    Draft
  </UIBadge>
</template>
