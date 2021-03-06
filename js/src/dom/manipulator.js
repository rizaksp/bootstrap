/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.3.1): dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

const regexDataKey = /[A-Z]/g

function normalizeData(val) {
  if (val === 'true') {
    return true
  } else if (val === 'false') {
    return false
  } else if (val === 'null') {
    return null
  } else if (val === Number(val).toString()) {
    return Number(val)
  } else if (val === '') {
    return null
  }

  return val
}

function normalizeDataKey(key) {
  return key.replace(regexDataKey, (chr) => chr.toLowerCase())
}

const Manipulator = {
  setDataAttribute(element, key, value) {
    element.setAttribute(`data-${normalizeDataKey(key)}`, value)
  },

  removeDataAttribute(element, key) {
    element.removeAttribute(`data-${normalizeDataKey(key)}`)
  },

  getDataAttributes(element) {
    if (!element) {
      return {}
    }

    const attributes = {
      ...element.dataset
    }

    Object.keys(attributes)
      .forEach((key) => {
        attributes[key] = normalizeData(attributes[key])
      })

    return attributes
  },

  getDataAttribute(element, key) {
    return normalizeData(element
      .getAttribute(`data-${normalizeDataKey(key)}`)
    )
  },

  offset(element) {
    const rect = element.getBoundingClientRect()

    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    }
  },

  position(element) {
    return {
      top: element.offsetTop,
      left: element.offsetLeft
    }
  },

  toggleClass(element, className) {
    if (!element) {
      return
    }

    if (element.classList.contains(className)) {
      element.classList.remove(className)
    } else {
      element.classList.add(className)
    }
  }
}

export default Manipulator
