package com.slingjade.engine;

import java.io.InputStream;
import java.io.SequenceInputStream;
import java.util.Dictionary;
import java.util.Iterator;

import javax.jcr.RepositoryException;
import javax.script.ScriptEngine;

import org.apache.commons.lang.time.StopWatch;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.apache.sling.scripting.api.AbstractScriptEngineFactory;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Created by brenn on 4/26/15.
 */
@Component
@Service(value = javax.script.ScriptEngineFactory.class)
public class JadeScriptEngine extends AbstractScriptEngineFactory{
}
